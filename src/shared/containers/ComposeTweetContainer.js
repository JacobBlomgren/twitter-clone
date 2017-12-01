import React from 'react';
import * as R from 'ramda';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ComposeTweet from '../components/ComposeTweet/ComposeTweet';

function mapStateToProps(state) {
  const users = R.pipe(
    R.filter(R.has('profilePictureURL')),
    R.map(({ username, profilePictureURL }) => ({
      name: `@${username}`,
      avatar: profilePictureURL,
    })),
  )(Object.values(state.entities.users.byID));
  return { users };
}

export default connect(mapStateToProps)(ComposeTweet);
