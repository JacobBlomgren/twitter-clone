import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavMobile from './Mobile/NavMobile';
import NavDesktop from './Desktop/NavDesktop';

function Nav({ loggedIn }) {
  return (
    <div className="NavContainer">
      <NavDesktop loggedIn={loggedIn} />
      <NavMobile loggedIn={loggedIn} />
    </div>
  );
}

Nav.propTypes = { loggedIn: PropTypes.bool.isRequired };

export default connect(state => ({
  loggedIn: typeof state.entities.login.user !== 'undefined',
}))(Nav);
