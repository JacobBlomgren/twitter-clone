import React from 'react';
import PropTypes from 'prop-types';

export default function ProfilePicture({ url, username, className }) {
  return (
    <img
      src={url}
      alt={username}
      className={`ProfilePicture rounded-circle ${className}`}
    />
  );
}

ProfilePicture.defaultProps = {
  className: '',
};

ProfilePicture.propTypes = {
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  className: PropTypes.string,
};
