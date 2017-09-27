import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function TweetInfo({ name, username, createdAt }) {
  return (
    <div className="Tweet__Info">
      <Link to={`/u/${username}`} className="Tweet__Info__Name">
        {name}
      </Link>
      <span className="LightText Tweet__Info__Username">@{username}</span>
      <small className="LightText">{moment(createdAt).fromNow()}</small>
    </div>
  );
}

TweetInfo.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
