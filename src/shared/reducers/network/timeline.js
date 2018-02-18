import { combineReducers } from 'redux';
import {
  FETCH_TIMELINE_FAILURE,
  FETCH_TIMELINE_REQUEST,
  FETCH_TIMELINE_SUCCESS,
} from '../../actions/timeline';

function fetching(state = { fetching: false }, action) {
  switch (action.type) {
    case FETCH_TIMELINE_REQUEST:
      return { fetching: true };
    case FETCH_TIMELINE_SUCCESS:
    case FETCH_TIMELINE_FAILURE:
      return { fetching: false };
    default:
      return state;
  }
}

function recievedAt(state = 0, action) {
  if (action.type === FETCH_TIMELINE_SUCCESS) return action.recievedAt;
  return state;
}

export default combineReducers({
  fetching,
  recievedAt,
});
