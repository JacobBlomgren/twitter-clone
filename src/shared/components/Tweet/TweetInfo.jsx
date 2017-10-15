import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Username from './Username';

export default function TweetInfo({ name, username, createdAt }) {
  return (
    <div className="Tweet__Info">
      <Link to={`/u/${username}`} className="Tweet__Info__Name">
        {name}
      </Link>
      <small className="LightText">{moment(createdAt).fromNow()}</small>
      <Username username={username} />
    </div>
  );
}

TweetInfo.propTypes = {
  ...Username.propTypes,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
