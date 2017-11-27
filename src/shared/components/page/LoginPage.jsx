import React from 'react';
import PropTypes from 'prop-types';

import LoginFormContainer from '../../containers/LoginFormContainer';

export default function LoginPage({ location }) {
  const from = location.state && location.state.from;
  return (
    <main className="MainColumn MainColumn--Narrow">
      <div className="Login">
        <h1 className="Login__Heading">Login</h1>
        <LoginFormContainer from={from} />
      </div>
    </main>
  );
}

LoginPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired,
};
