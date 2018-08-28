import {
    GET_POSTS,
    POSTS_LOADING,
    ADD_POST,
    DELETE_POST,
    ADD_POST_LOADING,
    DELETE_POST_LOADING
} from '../actions/types';

const initialState = {
    posts: [],
    loading: {
        loadingPosts: false,
        loadingAddPost: false,
        loadingDeletePost: false
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: { ...state.loading,
                    loadingPosts: false
                }
            }
        case POSTS_LOADING:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingPosts: true
                }
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                loading: { ...state.loading,
                    loadingAddPost: false
                }
            };
        case ADD_POST_LOADING:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingAddPost: true
                }
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload),
                loading: { ...state.loading,
                    loadingDeletePost: false
                }
            };
        case DELETE_POST_LOADING:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingDeletePost: true
                }
            }
        default:
            return state;
    }
}

// Initial Redux Setup - step 3