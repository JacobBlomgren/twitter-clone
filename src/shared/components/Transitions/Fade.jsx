import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

export default function Fade({ children, ...props }) {
  return (
    <CSSTransition {...props} timeout={500} classNames="fade">
      {children}
    </CSSTransition>
  );
}

Fade.propTypes = {
  children: PropTypes.element.isRequired,
};
