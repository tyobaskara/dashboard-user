import {
    GET_PHOTOS,
    PHOTOS_LOADING
} from '../actions/types';

const initialState = {
    photos: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                photos: action.payload,
                loading: false
            }
        case PHOTOS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

// Initial Redux Setup - step 3