import { normalizeTweets } from './normalization';
import camelizeKeys from '../utils/camelizeKeys';

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
      .catch(() => null);
  };
}
