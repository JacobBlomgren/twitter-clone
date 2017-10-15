import React from 'react';
import PropTypes from 'prop-types';

export default function Username({ username }) {
  return (
    <span className="LightText Tweet__Info__Username">
      <span className="sr-only">Username: </span>
      <span aria-hidden="true">@</span>
      {username}
    </span>
  );
}

Username.propTypes = {
  username: PropTypes.string.isRequired,
};
