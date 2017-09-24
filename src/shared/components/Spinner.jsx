import React from 'react';

import Fade from './Transitions/Fade';

export default function Spinner() {
  return (
    <Fade in>
      <div className="sk-wave">
        <div className="sk-rect sk-rect1" />
        <div className="sk-rect sk-rect2" />
        <div className="sk-rect sk-rect3" />
        <div className="sk-rect sk-rect4" />
        <div className="sk-rect sk-rect5" />
      </div>
    </Fade>
  );
}
