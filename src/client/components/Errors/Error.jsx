import React from 'react';
import PropTypes from 'prop-types';

import error from '../../../../public/icons/error.png';
import FadeInAndOut from '../Transitions/FadeInAndOut';

export default function Error({ message, id, removeError }) {
  return (
    <FadeInAndOut interval={5000} onExited={() => removeError(id)}>
      <div className="alert alert-warning Errors__Error" role="alert">
        <img src={error} className="Errors__Error__Icon" alt="" />
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
