import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import albumsReducer from './albumsReducer';
import photosReducer from './photosReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
    user: usersReducer,
    post: postsReducer,
    album: albumsReducer,
    photo: photosReducer,
    errors: errorsReducer
});

// Initial Redux Setup - step 2