import {
    GET_POSTS,
    POSTS_LOADING,
    CLEAR_POSTS,
    ADD_POST,
    ADD_POST_LOADING,
    ADD_POST_LOADING_FAILED,
    UPDATE_POST,
    UPDATE_POST_LOADING,
    UPDATE_POST_LOADING_FAILED,
    DELETE_POST,
    DELETE_POST_LOADING,
    DELETE_POST_LOADING_FAILED
} from '../actions/types';

const initialState = {
    posts: [],
    loading: {
        loadingPosts: false,
        loadingAddPost: false,
        loadingDeletePost: false,
        loadingUpdatePost: false
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
            }
        case ADD_POST_LOADING:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingAddPost: true
                }
            }
        case ADD_POST_LOADING_FAILED:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingAddPost: false
                }
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.postId ? {
                    ...post,
                    title: action.title,
                    body: action.body
                } : post),
                loading: { ...state.loading,
                    loadingUpdatePost: false
                }
            }
        case UPDATE_POST_LOADING:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingUpdatePost: true
                }
            }
        case UPDATE_POST_LOADING_FAILED:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingUpdatePost: false
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
        case DELETE_POST_LOADING_FAILED:
            return {
                ...state,
                loading: { ...state.loading,
                    loadingDeletePost: false
                }
            }
        case CLEAR_POSTS:
            return state
        default:
            return state
    }
}

// Initial Redux Setup - step 3