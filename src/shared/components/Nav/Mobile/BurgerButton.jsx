import React from 'react';
import PropTypes from 'prop-types';

export default function BurgerButton({ onClick, open }) {
  console.log(open);
  return (
    <button
      className={`BurgerButton hamburger hamburger--squeeze ${
        open ? 'is-active' : ''
      }`}
      type="button"
      aria-label="Menu"
      aria-controls="navigation"
      aria-expanded={open}
      onClick={onClick}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
}

BurgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
