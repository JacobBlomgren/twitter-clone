import React from 'react';
import PropTypes from 'prop-types';

import Error from './Error';

export default function Errors({ errors, removeError }) {
  return (
    <ol className="Errors" role="alert">
      {errors.map(e => (
        <li key={e.id}>
          <Error {...e} removeError={removeError} />
        </li>
      ))}
    </ol>
  );
}

Errors.propTypes = {
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  removeError: PropTypes.func.isRequired,
};
