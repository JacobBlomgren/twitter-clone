import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Searchbar from './Searchbar';

export default function NotLoggedIn({ location }) {
  const { pathname } = location;
  return (
    <div className="Nav__NotLoggedIn">
      <Searchbar />
      <span className="Nav__NotLoggedIn__SignUpLogIn">
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
    </div>
  );
}

NotLoggedIn.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
