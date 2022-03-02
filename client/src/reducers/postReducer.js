import {
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
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
    default:
      return state;
  }
};
