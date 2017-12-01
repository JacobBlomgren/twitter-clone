import { combineReducers } from 'redux';
import {
  FETCH_FOLLOWING_FAILURE,
  FETCH_FOLLOWING_REQUEST,
  FETCH_FOLLOWING_SUCCESS,
} from '../../actions/following';

function isFetching(state = false, action) {
  switch (action.type) {
    case FETCH_FOLLOWING_REQUEST:
      return true;
    case FETCH_FOLLOWING_FAILURE:
    case FETCH_FOLLOWING_SUCCESS:
      return false;
    default:
      return state;
  }
}

function recievedAt(state = 0, action) {
  if (action.type === FETCH_FOLLOWING_SUCCESS) return action.recievedAt;
  return state;
}

export default combineReducers({
  isFetching,
  recievedAt,
});
