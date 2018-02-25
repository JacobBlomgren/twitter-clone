import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Down from 'react-icons/lib/fa/caret-down';
import onClickOutside from 'react-onclickoutside';

function Button({ expanded, toggle }) {
  return (
    <button
      onClick={toggle}
      className={`NavDropDown__Button ${
        expanded ? 'NavDropDown__Button--Expanded' : ''
      }`}
    >
      {expanded ? <Down /> : <Down />}
    </button>
  );
}

Button.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

function DropDownList({ close }) {
  return (
    <div className="NavDropDown">
      <ul className="NavDropDown__List">
        <li className="NavDropDown__List__Item">
          <Link
            to="/settings"
            className="NavDropDown__List__Item__Link"
            onClick={close}
          >
            Settings
          </Link>
        </li>
        <li className="NavDropDown__List__Item">
          <Link
            to="/logout"
            className="NavDropDown__List__Item__Link"
            onClick={close}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

DropDownList.propTypes = {
  close: PropTypes.func.isRequired,
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  toggle() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  close() {
    this.setState({ expanded: false });
  }

  handleClickOutside() {
    this.setState({ expanded: false });
  }

  render() {
    const { expanded } = this.state;
    return (
      <span className="NavDropDownContainer">
        <span className="clearfix">
          <Button expanded={expanded} toggle={this.toggle} close={this.close} />
        </span>
        {expanded && <DropDownList close={this.close} />}
      </span>
    );
  }
}

export default onClickOutside(DropDown, { excludeScrollbar: true });
