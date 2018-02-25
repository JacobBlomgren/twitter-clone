import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from './NotLoggedIn';
import NavLoggedIn from './NavLoggedIn';

export default function NavDesktop({ loggedIn, location }) {
  return (
    <nav className="d-none d-md-block Nav">
      <div className="MainColumn NavDesktop__Column">
        {loggedIn ? <NavLoggedIn /> : <NotLoggedIn location={location} />}
      </div>
    </nav>
  );
}

NavDesktop.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
