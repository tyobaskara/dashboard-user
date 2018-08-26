import axios from 'axios';

import {
  GET_USERS,
  USERS_LOADING
} from './types';

// Get Users
export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_USERS,
        payload: []
      });
    });
};

// Set loading state
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};