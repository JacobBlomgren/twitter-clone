import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

function NotLoggedIn({ location }) {
  const { pathname } = location;
  return (
    <span className="float-right">
      <Link to="/signup" className="Nav__Link">
        Sign up
      </Link>
      <Link
        to={{ pathname: '/login', state: { from: pathname } }}
        className="Nav__Link"
      >
        Login
      </Link>
    </span>
  );
}

NotLoggedIn.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(NotLoggedIn);
