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
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_RESET,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
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

    localStorage.setItem('user', JSON.stringify(data));
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
  dispatch({ type: USER_PROFILE_RESET });
  dispatch({ type: LOGOUT });
};

export const getUserProfile = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.get('/api/profile/me');

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });

    localStorage.setItem('profile', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createAndUpdateProfile = (formData) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const newProfile = JSON.stringify(formData);

    const { data } = await axios.post('/api/profile', newProfile, config);

    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addExperience = (formData) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const newExperience = JSON.stringify(formData);

    const { data } = await axios.put(
      '/api/profile/experience',
      newExperience,
      config
    );

    dispatch({ type: ADD_EXPERIENCE_SUCCESS, payload: data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteExperience = (experience_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.delete(
      `/api/profile/experience/${experience_id}`
    );

    dispatch({ type: DELETE_EXPERIENCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEducation = (formData) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const newEducation = JSON.stringify(formData);

    const { data } = await axios.put(
      '/api/profile/education',
      newEducation,
      config
    );

    dispatch({ type: ADD_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: ADD_EDUCATION_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteEducation = (education_id) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.delete(
      `/api/profile/education/${education_id}`
    );

    dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }

    const { data } = await axios.delete('/api/profile');

    dispatch({ type: DELETE_ACCOUNT_SUCCESS });

    dispatch(logout());
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
