import React from 'react';
import Helmet from 'react-helmet';

import RedirectOnNotLoggedIn from './RedirectOnNotLoggedIn';
import SettingsContainer from '../../containers/SettingsContainer';

export default function SettingsPage() {
  return (
    <RedirectOnNotLoggedIn>
      <Helmet title="Settings" />
      <main className="MainColumn MainColumn--Narrow Main--FullPage">
        <div className="Form__Container">
          <h1 className="Form__Heading">Settings</h1>
          <SettingsContainer />
        </div>
      </main>
    </RedirectOnNotLoggedIn>
  );
}
