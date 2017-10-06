import React from 'react';
import PropTypes from 'prop-types';

export default function TweetProfilePicture({ url, username }) {
  return (
    <div className="TweetProfilePicture__Column">
      <img
        src={url}
        alt={username}
        className="TweetProfilePicture rounded-circle"
      />
    </div>
  );
}

TweetProfilePicture.propTypes = {
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
