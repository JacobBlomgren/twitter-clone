import R from 'ramda';
import { combineReducers } from 'redux';

import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';

function byID(state = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return R.mergeDeepWith(R.union, state, action.replies);
    default:
      return state;
  }
}

function allIDs(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return R.union(state, Object.keys(action.replies));
    default:
      return state;
  }
}

export default combineReducers({
  byID,
  allIDs,
});
