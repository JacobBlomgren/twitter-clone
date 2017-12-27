import React from 'react';
import PropTypes from 'prop-types';

import TimelinePage from './TimelinePage';
import LoggedInContainer from '../../containers/LoggedInContainer';

function HomePage({ loggedIn }) {
  if (loggedIn) return <TimelinePage />;
  return null;
}
HomePage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default LoggedInContainer(HomePage);
