import { combineReducers } from 'redux';
import { alertReducer } from './alertReducer';
import { userAuthReducer, userProfileReducer } from './userAuthReducer';

export default combineReducers({
  alert: alertReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
});
