import React from 'react';
import PropTypes from 'prop-types';

export default function ProfilePicture({ url, username }) {
  return (
    <img src={url} alt={username} className="ProfilePicture rounded-circle" />
  );
}

ProfilePicture.propTypes = {
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
