import axios from 'axios';
import {
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
} from '../constants/postConstants';
import { setToken } from '../utils/setToken';
import { setAlert } from './alertActions';

export const getAllPosts = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.get('/api/posts');

    dispatch({ type: ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_POSTS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createPost = (text) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const newPost = JSON.stringify({ text: text });

    const { data } = await axios.post('/api/posts', newPost, config);

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CREATE_POST_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletePost = (post_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    await axios.delete(`/api/posts/${post_id}`);

    dispatch({ type: DELETE_POST_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addLikes = (post_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.put(`/api/posts/like/${post_id}`);

    dispatch({ type: LIKE_POST_SUCCESS, payload: { post_id, likes: data } });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const removeLikes = (post_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.put(`/api/posts/unlike/${post_id}`);

    dispatch({ type: UNLIKE_POST_SUCCESS, payload: { post_id, likes: data } });
  } catch (error) {
    dispatch({
      type: UNLIKE_POST_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
