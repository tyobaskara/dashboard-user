import {
    GET_ALBUMS,
    ALBUMS_LOADING
} from '../actions/types';

const initialState = {
    albums: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALBUMS:
            return {
                ...state,
                albums: action.payload,
                loading: false
            }
        case ALBUMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

// Initial Redux Setup - step 3