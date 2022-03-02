import { combineReducers } from 'redux';
import { alertReducer } from './alertReducer';
import { userAuthReducer, userProfileReducer } from './userAuthReducer';
import { postReducer } from './postReducer';

export default combineReducers({
  alert: alertReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
  post: postReducer,
});
