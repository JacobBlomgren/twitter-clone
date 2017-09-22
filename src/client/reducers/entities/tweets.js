import R from 'ramda';

import {
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
  UNLIKE_TWEET_REQUEST,
  UNLIKE_TWEET_SUCCESS,
  UNLIKE_TWEET_FAILURE,
} from '../../actions/like';
import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';

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

function addLike(state, tweetID) {
  const tweet = state.byID[tweetID];
  if (!tweet || tweet.liked) return state;
  const newTweet = {
    ...tweet,
    likeCount: tweet.likeCount + 1,
    liked: true,
  };
  return replaceTweet(state, newTweet);
}

function removeLike(state, tweetID) {
  const tweet = state.byID[tweetID];
  if (!tweet || !tweet.liked) return state;
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

export default function(state = { byID: {}, allIDs: [] }, action) {
  switch (action.type) {
    case LIKE_TWEET_REQUEST:
      return addLike(state, action.tweetID);
    case LIKE_TWEET_FAILURE:
      return removeLike(state, action.tweetID);
    case UNLIKE_TWEET_REQUEST:
      return removeLike(state, action.tweetID);
    case UNLIKE_TWEET_FAILURE:
      return addLike(state, action.tweetID);
    case FETCH_PROFILE_SUCCESS:
      return recieveProfile(state, action);
    case LIKE_TWEET_SUCCESS:
    default:
      return state;
  }
}
