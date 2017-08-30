import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function TweetInfo({ name, username, createdAt }) {
  return (
    <div className="Tweet__Info">
      <span className="Name Tweet__Info__Name">
        {name}
      </span>
      <span>
        @{username}
      </span>
      <small>
        {moment(createdAt).fromNow()}
      </small>
    </div>
  );
}

TweetInfo.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
