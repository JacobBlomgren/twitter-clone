import { combineReducers } from 'redux';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from '../../actions/auth';

function login(state = false, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true;
    case LOGIN_FAILURE:
    case LOGIN_SUCCESS:
      return false;
    default:
      return state;
  }
}

function logout(state = false, action) {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return true;
    case LOGOUT_SUCCESS:
    case LOGOUT_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  login,
  logout,
});
