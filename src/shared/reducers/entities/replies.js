import * as R from 'ramda';
import { combineReducers } from 'redux';

import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';
import { FETCH_TWEET_SUCCESS, POST_TWEET_SUCCESS } from '../../actions/tweet';

function byID(state = {}, action) {
  switch (action.type) {
    case FETCH_TWEET_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
    case POST_TWEET_SUCCESS:
      return R.mergeDeepWith(R.union, state, action.replies);
    default:
      return state;
  }
}

function allIDs(state = [], action) {
  switch (action.type) {
    case FETCH_TWEET_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
    case POST_TWEET_SUCCESS:
      return R.union(state, Object.keys(action.replies));
    default:
      return state;
  }
}

export default combineReducers({
  byID,
  allIDs,
});
