import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from '../NotLoggedIn';
import NavLoggedIn from './NavLoggedIn';

export default function NavMobile({ loggedIn, location }) {
  return (
    <nav className="d-md-none Nav SmallPadding--Sides">
      {loggedIn ? <NavLoggedIn /> : <NotLoggedIn location={location} />}
    </nav>
  );
}
NavMobile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
