import * as R from 'ramda';
import { combineReducers } from 'redux';

import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';
import { FETCH_TWEET_SUCCESS } from '../../actions/tweet';
import { LOGIN_SUCCESS } from '../../actions/auth';

function byID(state = {}, action) {
  switch (action.type) {
    case FETCH_TWEET_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      return R.mergeDeepWith(R.union, state, action.replies);
    //  Invalidate all data on login
    case LOGIN_SUCCESS:
      return {};
    default:
      return state;
  }
}

function allIDs(state = [], action) {
  switch (action.type) {
    case FETCH_TWEET_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      return R.union(state, Object.keys(action.replies));
    //  Invalidate all data on login
    case LOGIN_SUCCESS:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  byID,
  allIDs,
});
