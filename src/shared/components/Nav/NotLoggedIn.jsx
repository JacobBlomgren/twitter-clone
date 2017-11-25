import React from 'react';
import { Link } from 'react-router-dom';

export default function NavNotLoggedIn() {
  return (
    <span className="float-right">
      <Link to="/signup" className="Nav__Link">
        Sign up
      </Link>
      <Link to="/login" className="Nav__Link">
        Login
      </Link>
    </span>
  );
}

NavNotLoggedIn.propTypes = {};
