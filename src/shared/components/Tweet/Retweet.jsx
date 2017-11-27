import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import RetweetIcon from 'react-icons/lib/fa/retweet';

export default function Retweet({ name, username }) {
  return (
    <div className="Retweet">
      <small className="LightText">
        <RetweetIcon className="Retweet__Icon" />
        <Link
          to={`/u/${username}`}
          className="Retweet__Link"
          onClick={e => e.stopPropagation()}
        >
          {name}
        </Link>
        {' Retweeted'}
      </small>
    </div>
  );
}

Retweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
