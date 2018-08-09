import React from 'react';

export default class UserPost extends React.Component {
  componentDidMount() {
    console.log('mount');
  }
  componentWillUnmount(){
    console.log('will unmount');
  }
  render(){
    return(
      <div>
        post
      </div>
    )
  }
}