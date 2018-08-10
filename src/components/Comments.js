import React from 'react';
import Comment from './Comment';

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
      comments: [],
      status: false
  }

  componentDidMount() {
    this.getComments();
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
    const Comments = this.state.comments.map((comment, index) => <Comment key={index} comment={comment} />);
    return (
      <ol className="post-comments">
        {Comments}
      </ol>
    )
  }
}