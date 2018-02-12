import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Searchbar from '../Searchbar';

export default function NotLoggedIn({ location }) {
  const { pathname } = location;
  return (
    <div className="Nav__NotLoggedIn">
      <div className="container-fluid container-fluid--no-padding">
        <div className="row no-gutters">
          <div className="col-3" />
          <div className="col-6">
            <Searchbar />
          </div>
          <div className="col-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}

NotLoggedIn.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
