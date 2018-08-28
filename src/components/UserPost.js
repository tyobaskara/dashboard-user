import React from 'react';
import Post from './Post';
import { Button, Icon, Form, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../actions/postsActions';

class UserPost extends React.Component {
  state = {
      addPostTitle: '',
      addPostBody: '',
      showAddPostModal: false
  }

  componentDidMount() {
    this.props.getPosts(this.props.data.id);
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
    this.setState({ showAddPostModal: false })
  }

  addPost = () => {
    const userId = this.props.data.id;
    const newPost = JSON.stringify({
      title: this.state.addPostTitle,
      body: this.state.addPostBody,
      userId: userId
    });
    this.props.addPost(newPost);

    this.closeModal();
  }

  render(){
    const { posts, loading } = this.props.post;
    const renderPosts = posts.map((post, index) => <Post key={index} post={post}/>);

    const {showAddPostModal} = this.state;
    const ModalAddPost = () => (
      <Modal closeIcon onClose={this.closeModal} open={showAddPostModal} trigger={<Button onClick={() => this.setState({ showAddPostModal: true })}>
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
        {loading.loadingPosts ? (<p style={{padding: '10px'}} align="center">Loading Posts..</p>) : (
        <ol className="user-posts">
          {renderPosts}
        </ol>
        )}
      </div>
    )
  }
}

UserPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(mapStateToProps, { getPosts, addPost })(UserPost);