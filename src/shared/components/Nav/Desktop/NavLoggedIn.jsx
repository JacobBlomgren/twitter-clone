import React from 'react';
import { Link } from 'react-router-dom';
import Home from 'react-icons/lib/fa/home';
import Edit from 'react-icons/lib/fa/edit';

import SearchbarContainer from '../../../containers/SearchbarContainer';
import DropDown from './DropDown';

export default function NavLoggedIn() {
  const iconStyle = { 'vertical-align': 'inherit' };
  const iconSize = '24px';
  return (
    <div className="container-fluid container-fluid--no-padding">
      <div className="row no-gutters">
        <div className="col-3">
          <Link to="/">
            <Home size={iconSize} style={iconStyle} />
          </Link>
          <Link to="/compose">
            <Edit size={iconSize} style={iconStyle} />
          </Link>
        </div>
        <div className="col-6">
          <SearchbarContainer />
        </div>
        <div className="col-3">
          <DropDown />
        </div>
      </div>
    </div>
  );
}
