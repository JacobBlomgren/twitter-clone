import { connect } from 'react-redux';

import Tweet from '../components/Tweet/Tweet';

import { likeTweet, unlikeTweet } from '../actions/like';

function mapStateToProps(state, { tweetID }) {
  const tweet = state.entities.tweets.byID[tweetID];
  const { name, username } = state.entities.users.byID[tweet.userID];
  return {
    name,
    username,
    ...tweet,
    replyCount: tweet.replies.length,
    replyTo: tweet.replyTo && state.entities.users.byID[tweet.replyTo].username,
  };
}

function mapDispatchToProps(dispatch, { tweetID }) {
  return {
    onLike: () => dispatch(likeTweet(tweetID)),
    onUnlike: () => dispatch(unlikeTweet(tweetID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
