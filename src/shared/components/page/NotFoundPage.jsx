import React from 'react';
import PropTypes from 'prop-types';
import NotFound from 'react-icons/lib/ti/delete-outline';

export default function NotFoundPage({ message }) {
  return (
    <div className="NotFound">
      <NotFound className="NotFound__Icon" />
      <p className="LightText NotFound__Text">{message || 'Page not found'}</p>
    </div>
  );
}

NotFoundPage.defaultProps = {
  message: '',
};

NotFoundPage.propTypes = {
  message: PropTypes.string,
};
