import React from 'react';
import PropTypes from 'prop-types';

import Error from './Error';

export default function Errors({ errors }) {
  return (
    <ol className="Errors" role="alert">
      {errors.map(e => (
        <li key={e.id}>
          <Error message={e.message} />
        </li>
      ))}
    </ol>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.objectOf({
      message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
