import React from 'react';
import Post from './Post';
import { Button, Icon, Form, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postsActions';

class UserPost extends React.Component {
  state = {
      posts: [],
      postsLoading: false,
      addPostTitle: '',
      addPostBody: '',
      showModal: false
  }

  componentDidMount() {
    this.props.getPosts(this.props.data.id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.posts.data.length) {
      const posts = newProps.posts.data.filter(el => {
        return el.userId == this.props.data.id;
      });

      if(posts[0] != null && typeof posts[0] != 'undefined') {
        this.setState({ 
            posts: posts[0].userPosts,
            postsLoading: posts[0].postsLoading
        });
      }
    }
  }

  handleChangeTitle = (e) => {
    this.setState({ addPostTitle: this.postTitle.value }, () => this.postTitle.focus());
  }
  handleChangeBody = (e) => {
    this.setState({ addPostBody: this.postBody.value }, () => this.postBody.focus());
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
      let newPost = this.state.posts;
          newPost.push(json);
      this.setState({posts: newPost})
      
      this.closeModal();
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
              <input type="text" id="addPostTitle" ref={(node) => {this.postTitle = node}} value={this.state.addPostTitle} onChange={this.handleChangeTitle}/>
          </Form.Field>
          <Form.Field>
              <label htmlFor="addPostBody">Body :</label>
              <textarea type="text" id="addPostBody" ref={(node) => {this.postBody = node}} value={this.state.addPostBody} onChange={this.handleChangeBody}/>
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

UserPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(UserPost);