import headers from '../utils/fetch/jsonHeaders';
import { addError } from './error';
import decamelizeKeys from '../utils/decamelizeKeys';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
function retweetRequest(tweetID) {
  return {
    type: RETWEET_REQUEST,
    tweetID,
  };
}

export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
function retweetSuccess(tweetID) {
  return {
    type: RETWEET_SUCCESS,
    tweetID,
  };
}

export const RETWEET_FAILURE = 'RETWEET_FAILURE';
function retweetFailure(tweetID) {
  return {
    type: RETWEET_FAILURE,
    tweetID,
  };
}

export function retweet(tweetID) {
  return dispatch => {
    dispatch(retweetRequest(tweetID));
    return fetch('/api/retweets/', {
      method: 'POST',
      headers,
      body: JSON.stringify(decamelizeKeys({ tweetID })),
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(retweetSuccess(tweetID));
      dispatch(addError('Retweet failed'));
      return dispatch(retweetFailure(tweetID));
    });
  };
}

export const REMOVE_RETWEET_REQUEST = 'REMOVE_RETWEET_REQUEST';
function removeRetweetRequest(tweetID) {
  return {
    type: REMOVE_RETWEET_REQUEST,
    tweetID,
  };
}

export const REMOVE_RETWEET_SUCCESS = 'REMOVE_RETWEET_SUCCESS';
function removeRetweetSuccess(tweetID) {
  return {
    type: REMOVE_RETWEET_SUCCESS,
    tweetID,
  };
}

export const REMOVE_RETWEET_FAILURE = 'REMOVE_RETWEET_FAILURE';
function removeRetweetFailure(tweetID) {
  return {
    type: REMOVE_RETWEET_FAILURE,
    tweetID,
  };
}

export function removeRetweet(tweetID) {
  return dispatch => {
    dispatch(removeRetweetRequest(tweetID));
    return fetch('/api/retweets/', {
      method: 'DELETE',
      headers,
      body: JSON.stringify(decamelizeKeys({ tweetID })),
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(removeRetweetSuccess(tweetID));
      dispatch(addError('Remove retweet failed'));
      return dispatch(removeRetweetFailure(tweetID));
    });
  };
}
