import * as R from 'ramda';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ComposeTweet from '../components/ComposeTweet/ComposeTweet';
import { postTweet } from '../actions/tweet';

function usersByIDSelector(state) {
  return state.entities.users.byID;
}

const users = createSelector(
  usersByIDSelector,
  R.pipe(
    R.values,
    R.filter(R.has('profilePictureURL')),
    R.map(({ username, profilePictureURL }) => ({
      name: `@${username}`,
      avatar: profilePictureURL,
    })),
  ),
);

function mapStateToProps(state) {
  return {
    users: users(state),
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
