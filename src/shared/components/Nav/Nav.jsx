import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavMobile from './Mobile/NavMobile';
import NavDesktop from './Desktop/NavDesktop';

function Nav({ loggedIn, location }) {
  return (
    <div className="NavContainer">
      <NavDesktop loggedIn={loggedIn} location={location} />
      <NavMobile loggedIn={loggedIn} location={location} />
    </div>
  );
}

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default withRouter(
  connect(state => ({
    loggedIn: typeof state.entities.login.user !== 'undefined',
  }))(Nav),
);
