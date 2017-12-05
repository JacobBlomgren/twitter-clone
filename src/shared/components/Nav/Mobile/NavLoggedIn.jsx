import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edit from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';
import BurgerButton from './BurgerButton';

export default class NavLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <div>
        <BurgerButton onClick={this.toggleMenu} open={menuOpen} />
        <Link to="/compose" className="NavComposeLink">
          <Edit size="28px" />
        </Link>
      </div>
    );
  }
}

NavLoggedIn.propTypes = {};
