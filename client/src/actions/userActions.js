import axios from 'axios';
import { setAlert } from './alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../constants/userConstants';
import { setToken } from '../utils/setToken';

export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const registerUser = JSON.stringify({ name, email, password });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post('/api/users', registerUser, config);
      dispatch({ type: REGISTER_SUCCESS, payload: data });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }
      const msg = error.response.data.msg;
      if (msg) {
        dispatch(setAlert(error.response.data.msg, 'danger'));
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const { data } = await axios.get('/api/auth');
    dispatch({ type: USER_LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOAD_FAIL });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const loginUser = JSON.stringify({ email, password });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post('/api/auth', loginUser, config);
      dispatch({ type: LOGIN_SUCCESS, payload: data });

      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }
      const msg = error.response.data.msg;
      if (msg) {
        dispatch(setAlert(error.response.data.msg, 'danger'));
      }

      dispatch({ type: LOGIN_FAIL });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
