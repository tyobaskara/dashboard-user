import { GET_POSTS, POSTS_LOADING } from '../actions/types';
import _ from 'lodash';

const initialState = {
    data: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:    
            return {
                data: _.unionBy(state.data, [action.payload], 'userId'),
                loading: false
            }
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

// Initial Redux Setup - step 3