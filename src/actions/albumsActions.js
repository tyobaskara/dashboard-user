import axios from 'axios';

import {
  GET_ALBUMS,
  ALBUMS_LOADING,
} from './types';

// Get Albums
export const getAlbums = userId => dispatch => {
  dispatch(setAlbumsLoading());
  axios
    .get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    .then(res =>
      dispatch({
        type: GET_ALBUMS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ALBUMS,
        payload: []
      });
    });
};


// Set loading state
export const setAlbumsLoading = () => {
  return {
    type: ALBUMS_LOADING
  };
};

// Initial Redux Setup - step 5