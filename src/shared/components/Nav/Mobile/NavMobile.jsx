import React from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from './NotLoggedIn';

export default function NavMobile({ loggedIn }) {
  return (
    <nav className="d-md-none Nav Nav--Mobile SmallPadding--Sides">
      {loggedIn ? '' : <NotLoggedIn />}
    </nav>
  );
}
NavMobile.propTypes = { loggedIn: PropTypes.bool.isRequired };
