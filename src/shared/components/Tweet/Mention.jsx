import React from 'react';
import PropTypes from 'prop-types';

export default function Mention({ mention }) {
  return (
    <span className="Mention">
      @<a href="#">{mention.replace('@', '')}</a>
    </span>
  );
}

Mention.propTypes = {
  mention: PropTypes.string.isRequired,
};
