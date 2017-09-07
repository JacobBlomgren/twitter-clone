export const LIKE_TWEET_REQUEST = 'LIKE_TWEET_REQUEST';
function requestLikeTweet(tweetID) {
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
  };
}

export function likeTweet(tweetID) {
  return dispatch => {
    dispatch(requestLikeTweet(tweetID));
    return fetch('/api/likes/', {
      method: 'POST',
      body: { tweet_id: tweetID },
      credentials: 'include',
    }).then(response => {
      if (response.ok) return dispatch(likeTweetSucess(tweetID));
      return dispatch(likeTweetFailure(tweetID));
    });
  };
}
