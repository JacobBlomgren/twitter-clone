import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from 'react-icons/lib/fa/exclamation-triangle';

import FadeInAndOut from '../Transitions/FadeInAndOut';

export default function Error({ message, id, removeError }) {
  return (
    <FadeInAndOut interval={5000} onExited={() => removeError(id)}>
      <div className="alert alert-warning Errors__Error" role="alert">
        <ErrorIcon className="Errors__Error__Icon" />
        <span className="sr-only">Error:</span>
        {message}
      </div>
    </FadeInAndOut>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeError: PropTypes.func.isRequired,
};
