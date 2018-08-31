import axios from 'axios';

import {
    GET_PHOTOS,
    CLEAR_PHOTOS,
    PHOTOS_LOADING,
} from './types';

// Get Photos
export const getPhotos = albumId => dispatch => {
    dispatch(clearPhotos());
    dispatch(setPhotosLoading());
    axios
        .get(`https://jsonplaceholder.typicode.com/photos`)
        .then(res => {
                dispatch({
                    type: GET_PHOTOS,
                    payload: res.data
                })
            }
        )
        .catch(err => {
            dispatch({
                type: GET_PHOTOS,
                payload: []
            });
        });
};


// Set loading state
export const setPhotosLoading = () => {
    return {
        type: PHOTOS_LOADING
    };
};

export const clearPhotos = () => {
    return {
        type: CLEAR_PHOTOS
    };
};

// Initial Redux Setup - step 5