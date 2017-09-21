import headers from '../utils/fetch/jsonHeaders';
import { addError } from './error';
import decamelizeKeys from '../utils/decamelizeKeys';

export const LIKE_TWEET_REQUEST = 'LIKE_TWEET_REQUEST';
function likeTweetRequest(tweetID) {
  return {
    type: LIKE_TWEET_REQUEST,
    tweetID,
  };
}
export const LIKE_TWEET_SUCCESS = 'LIKE_TWEET_SUCCESS';
function likeTweetSucess(tweetID) {
  return {
    type: LIKE_TWEET_SUCCESS,
    tweetID,
  };
}
export const LIKE_TWEET_FAILURE = 'LIKE_TWEET_FAILURE';
function likeTweetFailure(tweetID) {
  return {
    type: LIKE_TWEET_FAILURE,
    tweetID,
    error: 'Like failed',
  };
}

export function likeTweet(tweetID) {
  return dispatch => {
    dispatch(likeTweetRequest(tweetID));
    return fetch('/api/likes/', {
      method: 'POST',
      headers,
      body: JSON.stringify(decamelizeKeys({ tweetID })),
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(likeTweetSucess(tweetID));
      dispatch(addError('Like failed'));
      return dispatch(likeTweetFailure(tweetID));
    });
  };
}

export const UNLIKE_TWEET_REQUEST = 'UNLIKE_TWEET_REQUEST';
function unlikeTweetRequest(tweetID) {
  return {
    type: UNLIKE_TWEET_REQUEST,
    tweetID,
  };
}
export const UNLIKE_TWEET_SUCCESS = 'UNLIKE_TWEET_SUCCESS';
function unlikeTweetSucess(tweetID) {
  return {
    type: UNLIKE_TWEET_SUCCESS,
    tweetID,
  };
}
export const UNLIKE_TWEET_FAILURE = 'UNLIKE_TWEET_FAILURE';
function unlikeTweetFailure(tweetID) {
  return {
    type: UNLIKE_TWEET_FAILURE,
    tweetID,
    error: 'Unlike failed',
  };
}

export function unlikeTweet(tweetID) {
  return dispatch => {
    dispatch(unlikeTweetRequest(tweetID));
    return fetch('/api/likes/', {
      method: 'DELETE',
      headers,
      body: JSON.stringify(decamelizeKeys({ tweetID })),
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(unlikeTweetSucess(tweetID));
      dispatch(addError('Unlike failed'));
      return dispatch(unlikeTweetFailure(tweetID));
    });
  };
}
