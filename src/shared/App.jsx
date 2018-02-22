import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ErrorsContainer from './containers/ErrorsContainer';
import NavContainer from './containers/NavContainer';
import ComposePage from './components/page/ComposeTweetPage';
import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import LoginPage from './components/page/LoginPage';
import LogoutPage from './components/page/LogoutPage';
import HomePage from './components/page/HomePage';
import SettingsPage from './components/page/SettingsPage';
import { APP_NAME } from './config';

export default function App() {
  return (
    // these ids are needed by the mobile nav menu for its push effect
    <div id="outer-container">
      <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
      <NavContainer />
      <div className="Content" id="page-wrap">
        <Route path="/u/:username" component={ProfilePage} />
        <Route path="/t/:id" component={TweetPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/compose" component={ComposePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route exact path="/" component={HomePage} />
      </div>
      <ErrorsContainer />
    </div>
  );
}
