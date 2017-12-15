import * as R from 'ramda';
import { combineReducers } from 'redux';

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
import {
  FETCH_TWEET_NOT_FOUND,
  FETCH_TWEET_SUCCESS,
  POST_TWEET_SUCCESS,
} from '../../actions/tweet';
import { LOGIN_SUCCESS } from '../../actions/auth';
import { FETCH_TIMELINE_SUCCESS } from '../../actions/timeline';

// Replaces a tweet in state, that is assumed to exist.
function replaceTweet(state, tweet) {
  return {
    ...state,
    [tweet.id]: tweet,
  };
}

function addLike(state, tweetID) {
  const tweet = state[tweetID];
  if (!tweet || tweet.liked) return state;
  const newTweet = {
    ...tweet,
    likeCount: tweet.likeCount + 1,
    liked: true,
  };
  return replaceTweet(state, newTweet);
}

function removeLike(state, tweetID) {
  const tweet = state[tweetID];
  if (!tweet || !tweet.liked) return state;
  const newTweet = {
    ...tweet,
    likeCount: tweet.likeCount - 1,
    liked: false,
  };
  return replaceTweet(state, newTweet);
}

function addRetweet(state, tweetID) {
  const tweet = state[tweetID];
  if (!tweet || tweet.retweeted) return state;
  const newTweet = {
    ...tweet,
    retweetCount: tweet.retweetCount + 1,
    retweeted: true,
  };
  return replaceTweet(state, newTweet);
}

function removeRetweet(state, tweetID) {
  const tweet = state[tweetID];
  if (!tweet || !tweet.retweeted) return state;
  const newTweet = {
    ...tweet,
    retweetCount: tweet.retweetCount - 1,
    retweeted: false,
  };
  return replaceTweet(state, newTweet);
}

function merge(key, left, right) {
  // If we already have non-partial data (in left) the partial key is set to false
  // regardless of the new value, as we could recieve partial data afterwards.
  if (key === 'partial' && !left) return false;
  return right;
}

// Recursively merge the state with new tweets.
function mergeTweets(state, tweets) {
  if (tweets.length === 0) return state;
  const [tweet, ...tail] = tweets;
  return mergeTweets(
    R.mergeDeepWithKey(merge, state, { [tweet.id]: tweet }),
    tail,
  );
}

function recieveTweets(state, action) {
  return mergeTweets(state, action.tweets);
}

// Removes data concerning user actions (liked/retweeted tweets) on login.
function invalidateOnLogin(state) {
  // prettier-ignore
  return R.map(
    R.pipe(
      R.omit(['liked', 'retweeted']),
      R.assoc('partial', true),
    ),
    state
  );
}

function byID(state = {}, action) {
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
    case FETCH_TWEET_SUCCESS:
    case POST_TWEET_SUCCESS:
    case FETCH_TIMELINE_SUCCESS:
      return recieveTweets(state, action);
    case LOGIN_SUCCESS:
      return invalidateOnLogin(state);
    default:
      return state;
  }
}

function allIDs(state = [], action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
    case FETCH_TWEET_SUCCESS:
    case POST_TWEET_SUCCESS:
    case FETCH_TIMELINE_SUCCESS:
      return R.union(state, action.tweets.map(R.prop('id')));
    default:
      return state;
  }
}

// updates the list of not found tweets with the newly recieved tweets.
function updateNotFound(state, tweets) {
  if (Object.keys(state).length === 0) return state;
  return R.filter(t => R.none(R.propEq('id', t.id), tweets), state);
}

function notFound(state = {}, action) {
  switch (action.type) {
    case FETCH_TWEET_NOT_FOUND:
      return {
        ...state,
        [action.id]: { id: action.id, time: action.time },
      };
    case FETCH_TWEET_SUCCESS:
    case FETCH_PROFILE_SUCCESS:
      return updateNotFound(state, action.tweets);
    default:
      return state;
  }
}

function timeline(state = [], action) {
  console.log(action.tweets);
  if (action.type === FETCH_TIMELINE_SUCCESS) {
    // const ids = R.pipe(R.filter(R.propEq()))
    return R.union(state, R.pluck('id', action.tweets));
  }
  return state;
}

export default combineReducers({
  byID,
  allIDs,
  notFound,
  timeline,
});
