import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SmallSpinner from '../../Spinners/SmallSpinner';

export default function LoggedInUser({
  loading,
  name,
  username,
  profilePictureURL,
}) {
  if (loading) return <SmallSpinner />;
  return (
    <Link to={`/u/${username}`} className="Nav__UserInfo__Link">
      <img
        src={profilePictureURL}
        alt={name}
        className="rounded-circle Nav__UserInfo__Image"
      />
      {/* When we shorten the name, we make it shorter than the limit since we
          must make room for the periods.
        */}
      <span className="d-lg-none">
        {name.length > 16 ? `${name.substring(0, 14)}...` : name}
      </span>
      <span className="d-none d-lg-inline-block">
        {name.length > 18 ? `${name.substring(0, 17)}...` : name}
      </span>
    </Link>
  );
}

LoggedInUser.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string,
};

LoggedInUser.defaultProps = {
  name: '',
  profilePictureURL: '',
};
