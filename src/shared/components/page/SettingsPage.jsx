import React from 'react';
import PropTypes from 'prop-types';

import SettingsContainer from '../../containers/SettingsContainer';
import LoggedInContainer from '../../containers/LoggedInContainer';
import NotFoundPage from './NotFoundPage';

function SettingsPage({ loggedIn }) {
  if (!loggedIn) return <NotFoundPage />;
  return (
    <main className="MainColumn MainColumn--Narrow">
      <div className="Form__Container">
        <h1 className="Form__Heading">Settings</h1>
        <SettingsContainer />
      </div>
    </main>
  );
}

SettingsPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default LoggedInContainer(SettingsPage);
