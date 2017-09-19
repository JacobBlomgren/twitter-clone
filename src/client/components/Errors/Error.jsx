import React from 'react';
import PropTypes from 'prop-types';

import error from '../../../../public/icons/error.png';

export default function Error({ message }) {
  return (
    <div className="alert alert-warning Errors__Error fade show" role="alert">
      <img src={error} className="Errors__Error__Icon" alt="" />
      <span className="sr-only">Error:</span>
      {message}
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
