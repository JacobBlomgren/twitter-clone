import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from '../NotLoggedIn';

export default function NavDesktop({ loggedIn, location }) {
  return (
    <nav className="d-none d-md-block Nav">
      <div className="MainColumn SmallPadding--Sides">
        {loggedIn ? '' : <NotLoggedIn location={location} />}
      </div>
    </nav>
  );
}

NavDesktop.propTypes = { loggedIn: PropTypes.bool.isRequired };
