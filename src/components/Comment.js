import React from 'react';
import { Button, Confirm } from 'semantic-ui-react';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    commentId: this.props.comment.id,
    name: this.props.comment.name,
    email: this.props.comment.email,
    body: this.props.comment.body,
    editActive: false,
    open: false
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  bodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }


  commentUpdate = () => {
    const commentId = this.state.commentId;
    const updateCommentUrl = 'https://jsonplaceholder.typicode.com/comments/' + commentId;

    fetch(updateCommentUrl, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        body: this.state.body,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert('error ' + response.status);
        throw new Error('Something went wrong');
      }
    })
    .then(json => {
      this.setState({
        body: json.body,
        editActive: false
      });

      const inputBody = 'commentBody' + this.state.commentId;
      document.getElementById(inputBody).disabled = true;
    })
    .catch((error) => {
      alert('error ' + error);
    });
  }

  commentDelete = () => {
    const commentId = this.props.comment.id;
    const updateCommentUrl = 'https://jsonplaceholder.typicode.com/comments/' + commentId;

    fetch(updateCommentUrl, {
      method: 'DELETE'
    })
    .then(response => {
      console.log(response);
      const comment = 'comment' + this.state.commentId;
      if(response.ok) {
        document.getElementById(comment).remove();
        this.setState({open: false});
      }
      else {
        alert('error ' + response.status);
        this.setState({open: false});
      }
    });
  }

  commentEdit = (e) => {
    const inputBody = 'commentBody' + this.state.commentId;
    document.getElementById(inputBody).disabled = false;
    this.setState({
      editActive: true
    })
  }
  postCancel = (e) => {
    const inputBody = 'commentBody' + this.state.commentId;
    document.getElementById(inputBody).disabled = true;
    this.setState({
      editActive: false
    })
  }

  render() {
    return (
      <li className="post-comment" id={'comment' + this.state.commentId}>
        <p><span className="title">Name :</span> {this.state.name}</p>
        <p><span className="title">Email :</span> {this.state.email}</p>
        <div className="input-wrap">
          <label htmlFor={'commentBody' + this.state.commentId}>Comment :</label>
          <textarea value={this.state.body} onChange={this.bodyChange} id={'commentBody' + this.state.commentId} disabled/>
        </div>

        <div className="post-comment__btn">
          {this.state.editActive ? 
          <div className="post-edit">
            <button className="btn-update" onClick={this.commentUpdate}>Update</button>
            <button className="btn-update" onClick={this.postCancel}>Cancel</button>
          </div> : 
          <button className="btn-edit" onClick={this.commentEdit}>Edit</button> }

          <button className="btn-delete" onClick={this.open}>Delete</button>
          <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.commentDelete} />
        </div>
      </li>
    )
  }
}