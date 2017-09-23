import React from 'react';
import PropTypes from 'prop-types';

import ProfileContainer from '../../containers/ProfileContainer';

export default function ProfilePage({ match }) {
  return <ProfileContainer username={match.params.username} />;
}

ProfilePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};
