import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function MainTweetInfo({ name, username }) {
  return (
    <div className="Tweet__Info--Main">
      <Link to={`/u/${username}`} className="Tweet__Info__Name">
        {name}
      </Link>
      <div className="LightText Tweet__Info__Username">@{username}</div>
    </div>
  );
}

MainTweetInfo.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
