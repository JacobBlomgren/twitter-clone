import React from 'react';
import PropTypes from 'prop-types';

import NavMobile from './Mobile/NavMobile';
import NavDesktop from './Desktop/NavDesktop';

export default function Nav({ loggedIn, location }) {
  return (
    <div className="NavContainer">
      <NavDesktop loggedIn={loggedIn} location={location} />
      <NavMobile loggedIn={loggedIn} location={location} />
    </div>
  );
}

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
