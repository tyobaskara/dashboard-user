import axios from 'axios';

import {
  GET_POSTS,
  POSTS_LOADING,
  CLEAR_POSTS,
  CLEAR_ERRORS,
  GET_ERRORS,
  ADD_POST,
  ADD_POST_LOADING
} from './types';

// Get Posts
export const getPosts = userId => dispatch => {
  dispatch(clearPosts());
  dispatch(setPostsLoading());
  axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: []
      });
    });
};

// Add Post
export const addPost = newPost => dispatch => {
  dispatch(clearErrors());
  dispatch(addPostLoading());
  const options = {
    method: 'POST',
    headers: { 'content-type': "application/json; charset=UTF-8" },
    data: newPost,
    url: 'https://jsonplaceholder.typicode.com/posts'
  };
  axios(options)
    .then(res => {
        console.log(res);
        dispatch({
          type: ADD_POST,
          payload: res.data
        })
      }
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set loading state
export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
export const addPostLoading = () => {
  return {
    type: ADD_POST_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearPosts = () => {
  return {
    type: CLEAR_POSTS
  };
};

// Initial Redux Setup - step 5