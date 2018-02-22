import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import LoginFormContainer from '../../containers/LoginFormContainer';

export default function LoginPage({ location }) {
  const from = location.state && location.state.from;
  return (
    <div>
      <Helmet title="Login" />
      <main className="MainColumn MainColumn--Narrow Main--FullPage">
        <div className="Form__Container">
          <h1 className="Form__Heading">Login</h1>
          <LoginFormContainer from={from} />
        </div>
      </main>
    </div>
  );
}

LoginPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
};
