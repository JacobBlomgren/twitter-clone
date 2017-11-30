import React from 'react';
import * as R from 'ramda';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComposeTweet from '../components/ComposeTweet/ComposeTweet';

function mapStateToProps(state) {
  const users = Object.values(state.entities.users.byID).map(
    ({ username, profilePictureURL }) => ({
      name: `@${username}`,
      avatar: profilePictureURL,
    }),
  );
  return { users };
}

export default connect(mapStateToProps)(ComposeTweet);
