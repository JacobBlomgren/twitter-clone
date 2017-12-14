import { combineReducers } from 'redux';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
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

export default combineReducers({
  login,
});
