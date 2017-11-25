import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from '../NotLoggedIn';

export default function NavDesktop({ loggedIn }) {
  return (
    <nav className="d-none d-md-block Nav">
      <div className="MainColumn SmallPadding--Sides">
        {loggedIn ? '' : <NotLoggedIn />}
      </div>
    </nav>
  );
}

NavDesktop.propTypes = { loggedIn: PropTypes.bool.isRequired };
