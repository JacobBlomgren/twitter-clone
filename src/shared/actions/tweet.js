import { normalizeTweets } from './normalization';
import camelizeKeys from '../utils/camelizeKeys';
import { addError } from './error';
import decamelizeKeys from '../utils/decamelizeKeys';
import headers from '../utils/fetch/jsonHeaders';

export const FETCH_TWEET_REQUEST = 'FETCH_TWEET_REQUEST';
function fetchTweetRequest(tweetID) {
  return {
    type: FETCH_TWEET_REQUEST,
    tweetID,
  };
}

function normalizeTweetResponse(tweet, parents, children) {
  return normalizeTweets([
    { ...tweet, partial: false, recievedAt: Date.now() },
    ...parents,
    ...children,
  ]);
}

export const FETCH_TWEET_SUCCESS = 'FETCH_TWEET_SUCCESS';
export function fetchTweetSuccess(response) {
  const { tweet, parents, children } = camelizeKeys(response);
  return {
    ...normalizeTweetResponse(tweet, parents, children),
    type: FETCH_TWEET_SUCCESS,
  };
}

export const FETCH_TWEET_NOT_FOUND = 'FETCH_TWEET_NOT_FOUND';
export function fetchTweetNotFound(tweetID) {
  return {
    type: FETCH_TWEET_NOT_FOUND,
    id: tweetID,
    time: Date.now(),
  };
}

export function fetchTweet(tweetID) {
  return dispatch => {
    dispatch(fetchTweetRequest(tweetID));
    return fetch(`/api/tweets?tweet_id=${tweetID}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(json => dispatch(fetchTweetSuccess(json)))
      .catch(err => {
        if (err.message === '404') return dispatch(fetchTweetNotFound(tweetID));
        return null;
      });
  };
}

export const POST_TWEET_REQUEST = 'POST_TWEET_REQUEST';
function postTweetRequest() {
  return {
    type: POST_TWEET_REQUEST,
  };
}

export const POST_TWEET_SUCCESS = 'POST_TWEET_SUCCESS';
function postTweetSuccess(tweet) {
  const normalized = normalizeTweets([
    { ...camelizeKeys(tweet), partial: false },
  ]);
  return {
    type: POST_TWEET_SUCCESS,
    ...normalized,
  };
}

export const POST_TWEET_FAILURE = 'POST_TWEET_FAILURE';
function postTweetFailure() {
  return {
    type: POST_TWEET_FAILURE,
  };
}

/**
 * Posts a tweet in the logged in users name.
 * @param {string} content the content of the tweet (required).
 * @param {string} replyTo id of the tweet that this tweet is a reply to (optional).
 * @param {function(string)} callback a function that takes the posted tweet's id as a paramater.
 */
export function postTweet(content, replyTo, callback) {
  return dispatch => {
    dispatch(postTweetRequest());
    const body = replyTo ? { content, replyTo } : { content };
    return fetch('/api/tweets/', {
      method: 'POST',
      headers,
      body: JSON.stringify(decamelizeKeys(body)),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(json => {
        dispatch(postTweetSuccess(json));
        if (callback) callback(json.id);
      })
      .catch(err => {
        console.log(err);
        dispatch(postTweetFailure());
        dispatch(addError("Couldn't post tweet."));
      });
  };
}
