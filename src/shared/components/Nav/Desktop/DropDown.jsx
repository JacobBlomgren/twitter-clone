import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Down from 'react-icons/lib/fa/caret-down';

function Button({ expanded, toggle, close }) {
  return (
    <button
      onBlur={close}
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

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  close() {
    this.setState({ expanded: false });
  }

  render() {
    const { expanded } = this.state;
    return (
      <div className="NavDropDownContainer">
        <div className="clearfix">
          <Button expanded={expanded} toggle={this.toggle} close={this.close} />
        </div>
        {expanded && (
          <div className="NavDropDown">
            <ul className="NavDropDown__List">
              <li className="NavDropDown__List__Item">
                <Link to="/settings" className="NavDropDown__List__Item__Link">
                  Settings
                </Link>
              </li>
              <li className="NavDropDown__List__Item">
                <Link to="/logout" className="NavDropDown__List__Item__Link">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

DropDown.propTypes = {};
