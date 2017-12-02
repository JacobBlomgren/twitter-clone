import React from 'react';
import * as R from 'ramda';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ComposeTweet from '../components/ComposeTweet/ComposeTweet';
import { postTweet } from '../actions/tweet';

function mapStateToProps(state) {
  const users = R.pipe(
    R.filter(R.has('profilePictureURL')),
    R.map(({ username, profilePictureURL }) => ({
      name: `@${username}`,
      avatar: profilePictureURL,
    })),
  )(Object.values(state.entities.users.byID));
  return {
    users,
    posting: state.network.tweet.posting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postTweet: (content, replyTo, callback) =>
      dispatch(postTweet(content, replyTo, callback)),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ComposeTweet),
);
