import React from 'react';
import Post from './Post';

export default class UserPost extends React.Component {
  state = {
      posts: [],
      status: false
  }

  componentDidMount() {
    this.getPosts();
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
              this.setState({posts: jsonResponse, status: true});
          }
      });
  }

  render(){
    const Posts = this.state.posts.map((post, index) => <Post key={index} post={post} postUpdate={this.postUpdate}/>);

    return(
      <div>
        <ol className="user-posts">
          {Posts}
        </ol>
      </div>
    )
  }
}