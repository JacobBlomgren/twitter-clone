import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LogoutContainer from '../../containers/LogoutContainer';
import LoggedInContainer from '../../containers/LoggedInContainer';

function LogoutPage({ loggedIn }) {
  if (!loggedIn) return <Redirect to="/" />;
  return <LogoutContainer />;
}

LogoutPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default LoggedInContainer(LogoutPage);
