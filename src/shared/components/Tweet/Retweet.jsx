import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import retweet from '../../../../public/icons/retweet.png';

export default function Retweet({ name, username }) {
  return (
    <small className="LightText">
      <img src={retweet} className="Retweet__Icon" alt />
      <Link to={`/u/${username}`} className="Retweet__Link">
        {name}
      </Link>
      {' Retweeted'}
    </small>
  );
}

Retweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
