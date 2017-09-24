import { connect } from 'react-redux';

import Tweet from '../components/Tweet/Tweet';

import { likeTweet, unlikeTweet } from '../actions/like';

function mapStateToProps(state, { tweetID }) {
  const tweet = state.entities.tweets.byID[tweetID];
  const user = state.entities.users.byID[tweet.userID];
  return {
    name: user.name,
    username: user.username,
    ...tweet,
    replyCount: tweet.replies.length,
    replyTo: tweet.replyTo && tweet.replyTo.originalUsername,
  };
}

function mapDispatchToProps(dispatch, { tweetID }) {
  return {
    onLike: () => dispatch(likeTweet(tweetID)),
    onUnlike: () => dispatch(unlikeTweet(tweetID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
