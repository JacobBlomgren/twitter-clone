import React from 'react';
import PropTypes from 'prop-types';
import Mention from './Mention';

export default function ReplyTo({ username }) {
  return (
    <div className="ReplyTo">
      <span className="LightText">Replying to </span>
      <Mention mention={username} />
    </div>
  );
}

ReplyTo.propTypes = {
  username: PropTypes.string.isRequired,
};
