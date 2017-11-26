import React from 'react';
import PropTypes from 'prop-types';
import Close from 'react-icons/lib/fa/close';

export default function LoginError({ error, onClose }) {
  return (
    <div className="alert alert-danger Login__Error" role="alert">
      {error}
      <button onClick={onClose} className="Login__Error__Close">
        <Close />
      </button>
    </div>
  );
}

LoginError.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
