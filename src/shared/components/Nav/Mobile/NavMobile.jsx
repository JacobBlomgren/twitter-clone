import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from '../NotLoggedIn';

export default function NavMobile({ loggedIn, location }) {
  return (
    <nav className="d-md-none Nav SmallPadding--Sides">
      {loggedIn ? '' : <NotLoggedIn location={location} />}
    </nav>
  );
}
NavMobile.propTypes = { loggedIn: PropTypes.bool.isRequired };
