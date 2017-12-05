import React from 'react';
import PropTypes from 'prop-types';
import Edit from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';
import BurgerButton from './BurgerButton';

export default function NavLoggedIn({ open, toggleMenu }) {
  return (
    <div>
      <BurgerButton onClick={toggleMenu} open={open} />
      <Link to="/compose" className="NavComposeLink">
        <Edit size="28px" />
      </Link>
    </div>
  );
}

NavLoggedIn.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
