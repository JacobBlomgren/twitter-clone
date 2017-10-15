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
      <Username username={username} />
      <time dateTime={createdAt}>
        <small className="LightText">{moment(createdAt).fromNow()}</small>
      </time>
    </div>
  );
}

TweetInfo.propTypes = {
  ...Username.propTypes,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
