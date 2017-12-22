import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotLoggedIn from '../NotLoggedIn';
import NavLoggedIn from './NavLoggedIn';
import NavMenuContainer from '../../../containers/NavMenuContainer';

export default class NavMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen } = this.state;
    const { loggedIn, location } = this.props;
    return (
      <div>
        {loggedIn && (
          <NavMenuContainer
            open={menuOpen}
            onClick={this.closeMenu}
            pageWrapId="page-wrap"
            outerContainerId="outer-container"
          />
        )}
        <nav className="d-md-none Nav SmallPadding--Sides">
          {loggedIn ? (
            <NavLoggedIn
              open={menuOpen}
              toggleMenu={this.toggleMenu}
              closeMenu={this.closeMenu}
            />
          ) : (
            <NotLoggedIn location={location} />
          )}
        </nav>
      </div>
    );
  }
}

NavMobile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};
