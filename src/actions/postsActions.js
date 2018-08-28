import axios from 'axios';

import {
  GET_POSTS,
  POSTS_LOADING
} from './types';

// Get Posts
export const getPosts = userId => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: {
            userId: userId,
            userPosts: res.data
        }
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: {
            userId: userId,
            userPosts: []
        }
      });
    });
};

// Set loading state
export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};

// Initial Redux Setup - step 5