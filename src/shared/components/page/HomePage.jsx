import React from 'react';
import PropTypes from 'prop-types';

import TimelinePage from './TimelinePage';

export default function HomePage({ loggedIn }) {
  if (loggedIn) return <TimelinePage />;
  return null;
}

HomePage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
