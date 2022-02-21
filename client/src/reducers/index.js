import { combineReducers } from 'redux';
import { alertReducer } from './alertReducer';
import { userAuthReducer } from './userAuthReducer';

export default combineReducers({
  alert: alertReducer,
  userAuth: userAuthReducer,
});
