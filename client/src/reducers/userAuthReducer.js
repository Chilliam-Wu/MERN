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
} from '../constants/userConstants';

const userAuthInitialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: JSON.parse(localStorage.getItem('user')),
};

export const userAuthReducer = (state = userAuthInitialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case USER_LOAD_FAIL:
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};

const userProfleInitialState = {
  profile: JSON.parse(localStorage.getItem('profile')),
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export const userProfileReducer = (state = userProfleInitialState, action) => {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return { ...state, profile: null };
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        profile: action.payload,
      };
    case CREATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
