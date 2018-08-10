import React from 'react';
import Post from './Post';
import { Button, Icon, Form, Modal } from 'semantic-ui-react';

export default class UserPost extends React.Component {
  state = {
      posts: [],
      status: false,
      addPostTitle: '',
      addPostBody: '',
      showModal: false
  }

  componentDidMount() {
    this.getPosts();
  }

  handleChangeTitle = (e) => {
    this.setState({ addPostTitle: this.title.value }, () => this.title.focus());
  }
  handleChangeBody = (e) => {
    this.setState({ addPostBody: this.body.value }, () => this.body.focus());
  }

  handleCreateButton(evt) {
    evt.preventDefault();
    this.addPost();
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  addPost = () => {
    const userId = this.props.data.id;
    const postUrl = 'https://jsonplaceholder.typicode.com/posts';
    fetch(postUrl, {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.addPostTitle,
        body: this.state.addPostBody,
        userId: userId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let newPost = this.state.posts;
          newPost.push(json);
      this.setState({posts: newPost})
      
      this.closeModal();
    });
  }

  getPosts = () => {
      const userId = this.props.data.id;
      const usersUrl = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;

      fetch(usersUrl).then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Request failed!');
      }, networkError => {
          console.log(networkError.message);
      }
      ).then(jsonResponse => {
          if(jsonResponse != null) {
            console.log(jsonResponse);
              this.setState({posts: jsonResponse, status: true});
          }
      });
  }

  render(){
    const Posts = this.state.posts.map((post, index) => <Post key={index} post={post}/>);

    const {showModal} = this.state;
    const ModalAddPost = () => (
      <Modal closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>
        <Icon className='plus' />New Post</Button>}>
        <Modal.Header>Add New Post</Modal.Header>
        <Modal.Content>
          <Form.Field>
              <label htmlFor="addPostTitle">Title :</label>
              <input type="text" id="addPostTitle" ref={(node) => {this.title = node}} value={this.state.addPostTitle} onChange={this.handleChangeTitle}/>
          </Form.Field>
          <Form.Field>
              <label htmlFor="addPostBody">Body :</label>
              <textarea type="text" id="addPostBody" ref={(node) => {this.body = node}} value={this.state.addPostBody} onChange={this.handleChangeBody}/>
          </Form.Field>
          <Button onClick={(evt) => this.handleCreateButton(evt)}>Add</Button>
        </Modal.Content>
      </Modal>
    );

    return(
      <div>
        <div className="add-new-post text-right">
          <ModalAddPost/>
        </div>
        <ol className="user-posts">
          {Posts}
        </ol>
      </div>
    )
  }
}