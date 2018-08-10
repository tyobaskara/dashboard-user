import React from 'react';
import { Button, Confirm } from 'semantic-ui-react'

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    postId: this.props.post.id,
    title: this.props.post.title,
    body: this.props.post.body,
    editActive: false,
    open: false
  }

  componentDidMount() {

  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

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
    const updatePostUrl = 'https://jsonplaceholder.typicode.com/posts/' + postId;

    fetch(updatePostUrl, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: this.state.title,
        body: this.state.body,
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        title: json.title,
        body: json.body,
        editActive: false
      });

      const inputTitle = 'title' + this.state.postId;
      const inputBody = 'body' + this.state.postId;
      document.getElementById(inputTitle).disabled = true;
      document.getElementById(inputBody).disabled = true;
    })
  }

  postDelete = () => {
    const postId = this.props.post.id;
    const updatePostUrl = 'https://jsonplaceholder.typicode.com/posts/' + postId;

    fetch(updatePostUrl, {
      method: 'DELETE'
    })
    .then(response => {
      console.log(response);
      const post = 'post' + this.state.postId;
      if(response.ok) {
        document.getElementById(post).remove();
        this.setState({open: false});
      }
      else {
        console.log(response.status);
      }
    });
  }

  postEdit = (e) => {
    const inputTitle = 'title' + this.state.postId;
    const inputBody = 'body' + this.state.postId;
    document.getElementById(inputTitle).disabled = false;
    document.getElementById(inputBody).disabled = false;
    this.setState({
      editActive: true
    })
  }
  postCancel = (e) => {
    const inputTitle = 'title' + this.state.postId;
    const inputBody = 'body' + this.state.postId;
    document.getElementById(inputTitle).disabled = true;
    document.getElementById(inputBody).disabled = true;
    this.setState({
      editActive: false
    })
  }

  render() {
    return (
      <li className="user-posts__post" id={'post' + this.state.postId}>
        <div className="input-wrap">
          <label htmlFor={'title' + this.state.postId}>Title :</label>
          <input type="text" value={this.state.title} onChange={this.titleChange} id={'title' + this.state.postId} disabled/>
        </div>
        <div className="input-wrap">
          <label htmlFor={'body' + this.state.postId}>Body :</label>
          <textarea value={this.state.body} onChange={this.bodyChange} id={'body' + this.state.postId} disabled/>
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
      </li>
    )
  }
}