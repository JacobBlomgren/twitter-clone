import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { likeTweet, unlikeTweet } from '../actions/like';
import { removeRetweet, retweet as addRetweet } from '../actions/retweet';

function mapStateToProps(state, { id, retweet }) {
  const tweet = state.entities.tweets.byID[id];
  const { name, username, profilePictureURL } = state.entities.users.byID[
    tweet.userID
  ];
  return {
    name,
    username,
    profilePictureURL,
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

function mapDispatchToProps(dispatch, { id }) {
  return {
    onLike: () => dispatch(likeTweet(id)),
    onUnlike: () => dispatch(unlikeTweet(id)),
    onRetweet: () => dispatch(addRetweet(id)),
    onRemoveRetweet: () => dispatch(removeRetweet(id)),
  };
}

export default function TweetContainer({ Tweet, ...props }) {
  return React.createElement(
    connect(mapStateToProps, mapDispatchToProps)(Tweet),
    props,
  );
}

TweetContainer.propTypes = {
  Tweet: PropTypes.func.isRequired,
};
