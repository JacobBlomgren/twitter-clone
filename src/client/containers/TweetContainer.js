import { connect } from 'react-redux';

import Tweet from '../components/Tweet/Tweet';

import { likeTweet } from '../actions/like';

function mapStateToProps(state, { tweetID }) {
  const tweet = state.entities.tweets.byID[tweetID];
  const user = state.entities.users.byID[tweet.userID];
  return {
    name: user.name,
    username: user.username,
    ...tweet,
  };
}

function mapDispatchToProps(dispatch, { tweetID }) {
  return {
    onLike: () => dispatch(likeTweet(tweetID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
