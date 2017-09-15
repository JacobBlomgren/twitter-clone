import R from 'ramda';

import {
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
} from '../../actions/like';
import { RECIEVE_PROFILE_SUCCESS } from '../../actions/profile';

/*
 * Replaces a tweet in state, that is assumed to exist.
 */
function replaceTweet(state, tweet) {
  return {
    ...state,
    byID: {
      ...state.byID,
      [tweet.id]: tweet,
    },
  };
}

function likeTweetRequest(state, action) {
  const tweet = state.byID[action.tweetID];
  if (!tweet) return state;
  const newTweet = {
    ...tweet,
    likeCount: tweet.likeCount + 1,
    liked: true,
  };
  return replaceTweet(state, newTweet);
}

function likeTweetFailure(state, action) {
  const tweet = state.byID[action.tweetID];
  if (!tweet) return state;
  const newTweet = {
    ...tweet,
    likeCount: tweet.likeCount - 1,
    liked: false,
  };
  return replaceTweet(state, newTweet);
}

function recieveProfile(state, action) {
  const byID = {};
  action.tweets.forEach(t => {
    byID[t.id] = t;
  });
  const allIDs = action.tweets.map(R.prop('id'));
  return {
    allIDs: R.union(state.allIDs, allIDs),
    byID: R.mergeDeepRight(state.byID, byID),
  };
}

export default function(state = { byID: {}, allIDs: {} }, action) {
  switch (action.type) {
    case LIKE_TWEET_REQUEST:
      return likeTweetRequest(state, action);
    case LIKE_TWEET_FAILURE:
      return likeTweetFailure(state, action);
    case RECIEVE_PROFILE_SUCCESS:
      return recieveProfile(state, action);
    case LIKE_TWEET_SUCCESS:
    default:
      return state;
  }
}
