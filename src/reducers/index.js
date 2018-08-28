import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
    user: usersReducer,
    post: postsReducer,
    errors: errorsReducer
});

// Initial Redux Setup - step 2