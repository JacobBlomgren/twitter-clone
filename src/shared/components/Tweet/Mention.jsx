import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Mention({ mention }) {
  return (
    <span className="Mention">
      @<Link to={`/u/${mention}`} onClick={e => e.stopPropagation()}>
        {mention}
      </Link>
    </span>
  );
}

Mention.propTypes = {
  mention: PropTypes.string.isRequired,
};
