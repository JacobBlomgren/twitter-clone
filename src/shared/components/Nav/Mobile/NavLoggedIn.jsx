import React from 'react';
import PropTypes from 'prop-types';
import Edit from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';

import Searchbar from '../Searchbar';
import BurgerButton from './BurgerButton';

export default function NavLoggedIn({ open, toggleMenu, closeMenu }) {
  return (
    <div className="container-fluid container-fluid--no-padding">
      <div className="row no-gutters">
        <div className="col-2">
          <BurgerButton onClick={toggleMenu} open={open} />
        </div>
        <div className="col-8">
          <div className="NavLoggedInMobile__Searchbar">
            <Searchbar />
          </div>
        </div>
        <div className="col-2">
          <Link to="/compose" className="NavComposeLink" onClick={closeMenu}>
            <Edit size="28px" />
          </Link>
        </div>
      </div>
    </div>
  );
}

NavLoggedIn.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};
