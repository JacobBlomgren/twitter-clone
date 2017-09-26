import R from 'ramda';

import {
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_FAILURE,
  UNLIKE_TWEET_REQUEST,
  UNLIKE_TWEET_FAILURE,
} from '../../actions/like';
import { FETCH_PROFILE_SUCCESS } from '../../actions/profile';
import {
  REMOVE_RETWEET_FAILURE,
  REMOVE_RETWEET_REQUEST,
  RETWEET_FAILURE,
  RETWEET_REQUEST,
} from '../../actions/retweet';

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

function addRetweet(state, tweetID) {
  const tweet = state.byID[tweetID];
  if (!tweet || tweet.retweeted) return state;
  const newTweet = {
    ...tweet,
    retweetCount: tweet.retweetCount + 1,
    retweeted: true,
  };
  return replaceTweet(state, newTweet);
}

function removeRetweet(state, tweetID) {
  const tweet = state.byID[tweetID];
  if (!tweet || !tweet.retweeted) return state;
  const newTweet = {
    ...tweet,
    retweetCount: tweet.retweetCount - 1,
    retweeted: false,
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
    // We add a like at the request for immediate feedback, and remove it on failure
    case LIKE_TWEET_REQUEST:
    case UNLIKE_TWEET_FAILURE:
      return addLike(state, action.tweetID);
    case UNLIKE_TWEET_REQUEST:
    case LIKE_TWEET_FAILURE:
      return removeLike(state, action.tweetID);
    case RETWEET_REQUEST:
    case REMOVE_RETWEET_FAILURE:
      return addRetweet(state, action.tweetID);
    case RETWEET_FAILURE:
    case REMOVE_RETWEET_REQUEST:
      return removeRetweet(state, action.tweetID);
    case FETCH_PROFILE_SUCCESS:
      return recieveProfile(state, action);
    default:
      return state;
  }
}
