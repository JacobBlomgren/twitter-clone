import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import LoggedInContainer from '../../containers/LoggedInContainer';

function RedirectOnNotLoggedIn({ loggedIn, location, children }) {
  if (!loggedIn)
    return (
      <Redirect
        to={{ pathname: '/login', state: { from: location.pathname } }}
      />
    );
  return <div>{children}</div>;
}

RedirectOnNotLoggedIn.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default withRouter(LoggedInContainer(RedirectOnNotLoggedIn));
