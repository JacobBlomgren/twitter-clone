import { combineReducers } from 'redux';
import * as R from 'ramda';

import {
  FETCH_TWEET_FAILURE,
  FETCH_TWEET_NOT_FOUND,
  FETCH_TWEET_REQUEST,
  FETCH_TWEET_SUCCESS,
  POST_TWEET_FAILURE,
  POST_TWEET_REQUEST,
  POST_TWEET_SUCCESS,
} from '../../actions/tweet';

function fetching(state = [], action) {
  switch (action.type) {
    case FETCH_TWEET_REQUEST:
      return R.union(state, [action.tweetID]);
    case FETCH_TWEET_SUCCESS:
    case FETCH_TWEET_NOT_FOUND:
    case FETCH_TWEET_FAILURE:
      return R.without([action.id], state);
    default:
      return state;
  }
}

function posting(state = false, action) {
  switch (action.type) {
    case POST_TWEET_REQUEST:
      return true;
    case POST_TWEET_SUCCESS:
    case POST_TWEET_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  fetching,
  posting,
});
