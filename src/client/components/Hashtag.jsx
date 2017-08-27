import React from 'react';
import PropTypes from 'prop-types';

export default function Hashtag({ hashtag }) {
  return (
    <span className="Hashtag">
      #<a href="#">{hashtag.replace('#', '')}</a>
    </span>
  );
}

Hashtag.propTypes = {
  hashtag: PropTypes.string.isRequired,
};
