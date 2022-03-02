import axios from 'axios';
import {
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
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
