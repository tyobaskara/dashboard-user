import React from 'react';
import Post from './Post';
import { Button, Icon, Form, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, addPost, deletePost } from '../actions/postsActions';

class UserPost extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    addPostTitle: '',
    addPostBody: '',
    showAddPostModal: false
  }

  componentDidMount() {
    this.props.getPosts(this.props.data.id);
  }

  handleChangeTitle = (e) => {
    this.setState({ addPostTitle: e.target.value });
  }
  handleChangeBody = (e) => {
    this.setState({ addPostBody: e.target.value });
  }
  handleCreateButton = (e) => {
    e.preventDefault();
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

  deletePost = (postId) => {
    this.props.deletePost(postId);
  }

  render() {
    const { posts, loading } = this.props.post;
    const renderPosts = posts.map((post) => <Post key={post.id} userId={this.props.data.id} post={post} deletePost={this.deletePost}/>);

    const { showAddPostModal } = this.state;

    return (
      <div>
        <div className="add-new-post text-right">
          <Modal closeIcon onClose={this.closeModal} open={showAddPostModal} trigger={<Button onClick={() => this.setState({ showAddPostModal: true })}>
            <Icon className='plus' />New Post</Button>}>
            <Modal.Header>Add New Post</Modal.Header>
            <Modal.Content>
              <Form.Field>
                <label htmlFor="addPostTitle">Title :</label>
                <input type="text" id="addPostTitle" value={this.state.addPostTitle} onChange={this.handleChangeTitle} />
              </Form.Field>
              <Form.Field>
                <label htmlFor="addPostBody">Body :</label>
                <textarea type="text" id="addPostBody" value={this.state.addPostBody} onChange={this.handleChangeBody} />
              </Form.Field>
              <Button onClick={this.handleCreateButton}>Add</Button>
            </Modal.Content>
          </Modal>
        </div>
        {loading.loadingPosts ? (<p style={{ padding: '10px' }} align="center">Loading Posts..</p>) : (
          <ol className="user-posts">
            { renderPosts }
          </ol>
        )}
      </div>
    )
  }
}

UserPost.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(mapStateToProps, { getPosts, addPost , deletePost})(UserPost);