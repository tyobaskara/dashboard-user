import React from 'react';
import Comment from './Comment';
import { Button, Icon, Form, Modal } from 'semantic-ui-react';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
      postId: this.props.postId,
      comments: [],
      status: false,
      addCommentName: '',
      addCommentEmail: '',
      addCommentBody: '',
      showModal: false
  }

  componentDidMount() {
    this.getComments();
  }

  handleChangeName = (e) => {
    this.setState({ addCommentName: this.commentName.value }, () => this.commentName.focus());
  }
  handleChangeEmail = (e) => {
    this.setState({ addCommentEmail: this.commentEmail.value }, () => this.commentEmail.focus());
  }
  handleChangeBody = (e) => {
    this.setState({ addCommentBody: this.commentBody.value }, () => this.commentBody.focus());
  }
  handleCreateButton(evt) {
    evt.preventDefault();
    this.addComment();
  }

  addComment = () => {
    const commentUrl = 'https://jsonplaceholder.typicode.com/comments';
    fetch(commentUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.addCommentName,
        email: this.state.addCommentEmail,
        body: this.state.addCommentBody,
        postId: this.state.postId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let newComment = this.state.comments;
          newComment.push(json);
      this.setState({comments: newComment})
      
      this.closeModal();
    });
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  getComments = () => {
      const postId = this.props.postId;
      const commentsUrl = 'https://jsonplaceholder.typicode.com/comments?postId=' + postId;

      fetch(commentsUrl).then(response => {
          if (response.ok) {
              return response.json();
          }
          throw new Error('Request failed!');
      }, networkError => {
          console.log(networkError.message);
      })
      .then(jsonResponse => {
          if(jsonResponse != null) {
              this.setState({comments: jsonResponse, status: true});
          }
      });
  }

  render() {
    const Comments = this.state.comments.map((comment, index) => <Comment key={index} comment={comment} postId={this.props.postId}/>);

    const {showModal} = this.state;
    const ModalAddComment = () => (
      <Modal closeIcon onClose={this.closeModal} open={showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>
        <Icon className='plus' />New Comment</Button>}>
        <Modal.Header>Add New Comment</Modal.Header>
        <Modal.Content>
          <Form.Field>
              <label htmlFor="addCommentName">Name :</label>
              <input type="text" id="addCommentName" ref={(node) => {this.commentName = node}} value={this.state.addCommentName} onChange={this.handleChangeName}/>
          </Form.Field>
          <Form.Field>
              <label htmlFor="addCommentEmail">Email :</label>
              <textarea type="text" id="addCommentEmail" ref={(node) => {this.commentEmail = node}} value={this.state.addCommentEmail} onChange={this.handleChangeEmail}/>
          </Form.Field>
          <Form.Field>
              <label htmlFor="addCommentBody">Body :</label>
              <textarea type="text" id="addCommentBody" ref={(node) => {this.commentBody = node}} value={this.state.addCommentBody} onChange={this.handleChangeBody}/>
          </Form.Field>
          <Button onClick={(evt) => this.handleCreateButton(evt)}>Add</Button>
        </Modal.Content>
      </Modal>
    );
    return (
      <div>
        <div className="add-new-comment text-right">
          <ModalAddComment/>
        </div>
        <ol className="post-comments">
          {Comments}
        </ol>
      </div>
    )
  }
}