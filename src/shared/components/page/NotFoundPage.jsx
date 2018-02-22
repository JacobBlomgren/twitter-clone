import React from 'react';
import PropTypes from 'prop-types';
import NotFound from 'react-icons/lib/ti/delete-outline';
import Helmet from 'react-helmet';

export default function NotFoundPage({ message }) {
  const text = message || 'Page not found';
  return (
    <div className="NotFound">
      <Helmet title={text} />
      <NotFound className="NotFound__Icon" />
      <p className="LightText NotFound__Text">{text}</p>
    </div>
  );
}

NotFoundPage.defaultProps = {
  message: '',
};

NotFoundPage.propTypes = {
  message: PropTypes.string,
};
