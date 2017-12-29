import React from 'react';
import PropTypes from 'prop-types';

import Fade from '../Transitions/Fade';

export default function Spinner({ fullPage }) {
  return (
    <Fade in>
      <div className={`${fullPage ? 'Spinner--FullPage' : ''}`}>
        <div className="sk-wave" aria-busy>
          <div className="sk-rect sk-rect1" />
          <div className="sk-rect sk-rect2" />
          <div className="sk-rect sk-rect3" />
          <div className="sk-rect sk-rect4" />
          <div className="sk-rect sk-rect5" />
        </div>
      </div>
    </Fade>
  );
}

Spinner.propTypes = {
  fullPage: PropTypes.bool.isRequired,
};
