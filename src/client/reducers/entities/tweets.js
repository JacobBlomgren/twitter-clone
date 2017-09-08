import {
  LIKE_TWEET_REQUEST,
  LIKE_TWEET_SUCCESS,
  LIKE_TWEET_FAILURE,
} from '../../actions/like';

function likeTweetRequest(state, action) {
  const tweet = state.byID[action.tweetID];
  if (!tweet) return state;
  const newTweet = {
    ...tweet,
    likes: tweet.likes + 1,
    liked: true,
  };
  return {
    ...state,
    byID: {
      ...state.byID,
      [action.tweetID]: newTweet,
    },
  };
}

function likeTweetFailure(state, action) {
  const tweet = state.byID[action.tweetID];
  if (!tweet) return state;
  const newTweet = {
    ...tweet,
    likes: tweet.likes - 1,
    liked: false,
  };
  return {
    ...state,
    byID: {
      ...state.byID,
      [action.tweetID]: newTweet,
    },
  };
}

export default function(state = { byID: {}, allIDs: {} }, action) {
  switch (action.type) {
    case LIKE_TWEET_REQUEST:
      return likeTweetRequest(state, action);
    case LIKE_TWEET_FAILURE:
      return likeTweetFailure(state, action);
    case LIKE_TWEET_SUCCESS:
    default:
      return state;
  }
}
