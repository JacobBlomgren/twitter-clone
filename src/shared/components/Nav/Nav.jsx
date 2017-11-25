import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavMobile from './Mobile/NavMobile';

function Nav({ loggedIn }) {
  return (
    <div className="NavContainer">
      <NavMobile loggedIn={loggedIn} />
    </div>
  );
}

Nav.propTypes = { loggedIn: PropTypes.bool.isRequired };

export default connect(state => ({
  loggedIn: typeof state.loggedInUserID !== 'undefined',
}))(Nav);
