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
  CREATE_PROFILE_RESET,
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
  ALL_PROFILES_SUCCESS,
  ALL_PROFILES_FAIL,
  SINGLE_PROFILE_SUCCESS,
  SINGLE_PROFILE_FAIL,
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
        create_success: true,
        profile: action.payload,
      };
    case CREATE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_PROFILE_RESET:
      return {
        ...state,
        exp_success: false,
        delete_success: false,
        edu_success: false,
        create_success: false,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return { ...state, profile: action.payload, exp_success: true };
    case ADD_EXPERIENCE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        delete_success: true,
      };
    case DELETE_EXPERIENCE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        edu_success: true,
      };
    case ADD_EDUCATION_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        delete_success: true,
      };
    case DELETE_EDUCATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        profile: null,
        profiles: [],
        repos: [],
        loading: true,
        error: {},
      };
    case DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ALL_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case ALL_PROFILES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SINGLE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case SINGLE_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
