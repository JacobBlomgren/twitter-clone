import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Username from '../Username';

export default function MainTweetInfo({ name, username }) {
  return (
    <div className="Tweet__Info--Main">
      <Link to={`/u/${username}`} className="Tweet__Info__Name">
        {name}
      </Link>
      <div>
        <Username username={username} />
      </div>
    </div>
  );
}

MainTweetInfo.propTypes = {
  ...Username.propTypes,
  name: PropTypes.string.isRequired,
};
