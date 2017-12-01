import {
  POST_TWEET_FAILURE,
  POST_TWEET_REQUEST,
  POST_TWEET_SUCCESS,
} from '../../actions/tweet';

export default function(state = { posting: false }, action) {
  switch (action.type) {
    case POST_TWEET_REQUEST:
      return { posting: true };
    case POST_TWEET_SUCCESS:
    case POST_TWEET_FAILURE:
      return { posting: false };
    default:
      return state;
  }
}
