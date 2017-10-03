import React from 'react';
import PropTypes from 'prop-types';

import notFound from '../../../../public/icons/not-found.png';

export default function NotFoundPage({ message }) {
  return (
    <div>
      <img src={notFound} alt="" />
      <span>{message || 'Page not found'}</span>
    </div>
  );
}

NotFoundPage.defaultProps = {
  message: '',
};

NotFoundPage.propTypes = {
  message: PropTypes.string,
};
