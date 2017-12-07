import { combineReducers } from 'redux';
import * as R from 'ramda';

import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_NOT_FOUND,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
} from '../../actions/profile';

function fetching(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return R.union(state, [action.username]);
    case FETCH_PROFILE_SUCCESS:
    case FETCH_PROFILE_NOT_FOUND:
    case FETCH_PROFILE_FAILURE:
      return R.without([action.username], state);
    default:
      return state;
  }
}
export default combineReducers({
  fetching,
});
