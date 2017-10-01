import { connect } from 'react-redux';

import Tweet from '../components/Tweet/Tweet';

import { likeTweet, unlikeTweet } from '../actions/like';
import { removeRetweet, retweet as addRetweet } from '../actions/retweet';

function mapStateToProps(state, { id, retweet }) {
  const tweet = state.entities.tweets.byID[id];
  const { name, username } = state.entities.users.byID[tweet.userID];
  return {
    name,
    username,
    ...tweet,
    replyTo:
      tweet.replyTo &&
      state.entities.users.byID[
        state.entities.tweets.byID[tweet.replyTo].userID
      ].username,
    retweet: retweet && {
      username: state.entities.users.byID[retweet].username,
      name: state.entities.users.byID[retweet].name,
    },
  };
}

function mapDispatchToProps(dispatch, { tweetID }) {
  return {
    onLike: () => dispatch(likeTweet(tweetID)),
    onUnlike: () => dispatch(unlikeTweet(tweetID)),
    onRetweet: () => dispatch(addRetweet(tweetID)),
    onRemoveRetweet: () => dispatch(removeRetweet(tweetID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
