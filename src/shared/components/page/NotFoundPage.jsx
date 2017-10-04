import React from 'react';
import PropTypes from 'prop-types';

import notFound from '../../../../public/icons/not-found.png';

export default function NotFoundPage({ message }) {
  return (
    <div className="NotFound">
      <img src={notFound} alt="" className="NotFound__Icon" />
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
