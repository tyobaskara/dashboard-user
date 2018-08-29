import React from 'react';
import { Accordion, Button, Confirm } from 'semantic-ui-react';
import Comments from './Comments';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../actions/postsActions';

class Post extends React.Component {
  state = {
    postId: this.props.post.id,
    title: this.props.post.title,
    body: this.props.post.body,
    editActive: false,
    open: false,
    activeIndex: -1
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  AccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex })
  }

  titleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  bodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  postUpdate = () => {
    const postId = this.state.postId;
    const userId = this.props.userId;

    const body = JSON.stringify({
      id: postId,
      title: this.state.title,
      body: this.state.body,
      cancelUpdate: {},
      userId: userId
    });

    this.props.updatePost(postId,body);

    this.setState({editActive: false});
    const inputTitle = 'postTitle' + this.state.postId;
    const inputBody = 'postBody' + this.state.postId;
    document.getElementById(inputTitle).disabled = true;
    document.getElementById(inputBody).disabled = true;
  }

  postDelete = () => {
    const postId = this.props.post.id;
    this.props.deletePost(postId);
    this.setState({open: false});
  }

  postEdit = (e) => {
    const { title , body} = this.state;
    this.setState({
      cancelUpdate: {
        title: title,
        body: body
      }
    });

    const inputTitle = 'postTitle' + this.state.postId;
    const inputBody = 'postBody' + this.state.postId;
    document.getElementById(inputTitle).disabled = false;
    document.getElementById(inputBody).disabled = false;
    this.setState({
      editActive: true
    })
  }
  postCancel = (e) => {
    const { cancelUpdate } = this.state;
    this.setState({
      title: cancelUpdate.title ? cancelUpdate.title : '',
      body: cancelUpdate.body ? cancelUpdate.body : '',
    })

    const inputTitle = 'postTitle' + this.state.postId;
    const inputBody = 'postBody' + this.state.postId;
    document.getElementById(inputTitle).disabled = true;
    document.getElementById(inputBody).disabled = true;
    this.setState({
      editActive: false
    })
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <li className="user-posts__post" id={'post' + this.state.postId}>
        <div className="input-wrap">
          <label htmlFor={'postTitle' + this.state.postId}>Title :</label>
          <input type="text" value={this.state.title} onChange={this.titleChange} id={'postTitle' + this.state.postId} disabled/>
        </div>
        <div className="input-wrap">
          <label htmlFor={'postBody' + this.state.postId}>Body :</label>
          <textarea value={this.state.body} onChange={this.bodyChange} id={'postBody' + this.state.postId} disabled/>
        </div>

        <div className="user-posts__post-btn">

          {this.state.editActive ? 
          <div className="post-edit">
            <button className="btn-update" onClick={this.postUpdate}>Update</button>
            <button className="btn-update" onClick={this.postCancel}>Cancel</button>
          </div> : 
          <button className="btn-edit" onClick={this.postEdit}>Edit</button> }

          <button className="btn-delete" onClick={this.open}>Delete</button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.postDelete} />
        </div>

        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.AccordionClick}>
          View Comments
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <Comments postId={this.state.postId}/>
          </Accordion.Content>
        </Accordion>
      </li>
    )
  }
}

Post.propTypes = {
  updatePost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(mapStateToProps, { updatePost })(Post);