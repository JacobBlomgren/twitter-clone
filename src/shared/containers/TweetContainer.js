import { connect } from 'react-redux';

import Tweet from '../components/Tweet/Tweet';

import { likeTweet, unlikeTweet } from '../actions/like';
import { removeRetweet, retweet } from '../actions/retweet';

function mapStateToProps(state, { tweetID }) {
  const tweet = state.entities.tweets.byID[tweetID];
  const { name, username } = state.entities.users.byID[tweet.userID];
  return {
    name,
    username,
    ...tweet,
    replyCount: tweet.replies.length,
    replyTo: tweet.replyTo && state.entities.users.byID[tweet.replyTo].username,
    retweet: tweet.retweet && {
      username: state.entities.users.byID[tweet.retweet].username,
      name: state.entities.users.byID[tweet.retweet].name,
    },
  };
}

function mapDispatchToProps(dispatch, { tweetID }) {
  return {
    onLike: () => dispatch(likeTweet(tweetID)),
    onUnlike: () => dispatch(unlikeTweet(tweetID)),
    onRetweet: () => dispatch(retweet(tweetID)),
    onRemoveRetweet: () => dispatch(removeRetweet(tweetID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
