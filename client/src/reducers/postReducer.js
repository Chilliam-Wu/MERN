import {
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_RESET,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_RESET,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  UNLIKE_POST_RESET,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
} from '../constants/postConstants';

const postInitialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export const postReducer = (state = postInitialState, action) => {
  switch (action.type) {
    case ALL_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case ALL_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        create_success: true,
      };
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_POST_RESET:
      return {
        ...state,
        loading: false,
        create_success: false,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          // find the liked post in posts
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
        like_success: true,
      };
    case LIKE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LIKE_POST_RESET:
      return {
        ...state,
        loading: false,
        like_success: false,
      };
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload }
            : post
        ),
        unlike_success: true,
      };
    case UNLIKE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UNLIKE_POST_RESET:
      return {
        ...state,
        loading: false,
        unlike_success: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        delete_success: true,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_POST_RESET:
      return {
        ...state,
        loading: false,
        delete_success: false,
      };
    default:
      return state;
  }
};
