import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import ProfileContainer from '../../containers/Profile/ProfileContainer';
import { findUser } from '../../containers/Profile/mapStateToProps';

function ProfilePage({ name, username }) {
  return (
    <div>
      <Helmet title={name || username} />
      <ProfileContainer username={username} />
    </div>
  );
}

ProfilePage.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string.isRequired,
};

ProfilePage.defaultProps = { name: null };

function mapStateToProps(state, ownProps) {
  const { match: { params: { username } } } = ownProps;
  const user = findUser(Object.values(state.entities.users.byID), username);
  return {
    name: user && user.name,
    username,
  };
}

export default connect(mapStateToProps)(ProfilePage);
