import { normalizeTweets } from './normalization';
import camelizeKeys from '../utils/camelizeKeys';

export const FETCH_TWEET_REQUEST = 'FETCH_TWEET_REQUEST';
function fetchTweetRequest(tweetID) {
  return {
    type: FETCH_TWEET_REQUEST,
    tweetID,
  };
}

export const FETCH_TWEET_SUCCESS = 'FETCH_TWEET_SUCCESS';
export function fetchTweetSuccess(response) {
  const { tweet, parents, children } = camelizeKeys(response);
  const normalized = normalizeTweets([tweet, ...parents, ...children]);
  return {
    ...normalized,
    type: FETCH_TWEET_SUCCESS,
  };
}
