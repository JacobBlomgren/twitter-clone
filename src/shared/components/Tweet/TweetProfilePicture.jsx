import React from 'react';
import PropTypes from 'prop-types';

export default function TweetProfilePicture({ url, username }) {
  return (
    <img
      src={url}
      alt={username}
      className="TweetProfilePicture rounded-circle"
    />
  );
}

TweetProfilePicture.propTypes = {
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
