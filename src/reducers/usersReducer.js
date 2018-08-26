import { GET_USERS, USERS_LOADING } from '../actions/types';

const initialState = {
    data: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
          return {
              data: action.payload,
              loading: false
          }
        case USERS_LOADING:
          return {
              ...state,
              loading: true
          }
        default:
            return state;
    }
}

// Initial Redux Setup - step 3