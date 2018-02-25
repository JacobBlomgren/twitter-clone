import React from 'react';
import { Link } from 'react-router-dom';
import Home from 'react-icons/lib/fa/home';
import Edit from 'react-icons/lib/fa/edit';

import SearchbarContainer from '../../../containers/SearchbarContainer';
import NavUserInfoContainer from '../../../containers/NavUserInfoContainer';
import DropDown from './DropDown';

export default function NavLoggedIn() {
  const iconStyle = { 'vertical-align': 'middle' };
  return (
    <div className="container-fluid container-fluid--no-padding">
      <div className="row no-gutters">
        <div className="col-1">
          <Link to="/">
            <Home size="24px" style={iconStyle} />
          </Link>
        </div>
        <div className="col-6">
          <SearchbarContainer />
        </div>
        <div className="col-5">
          <div className="float-right">
            <span className="Nav__LoggedInAction">
              <NavUserInfoContainer />
            </span>
            <span className="Nav__LoggedInAction">
              <Link to="/compose">
                <Edit size="1.3rem" style={iconStyle} />
              </Link>
            </span>
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  );
}
