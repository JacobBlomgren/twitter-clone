import React from 'react';
import { Route } from 'react-router-dom';

import ErrorsContainer from './containers/ErrorsContainer';
import NavContainer from './containers/NavContainer';
import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import LoginPage from './components/page/LoginPage';
import Lazy from './components/ComposeTweet/Lazy';
import HomePage from './components/page/HomePage';
import SettingsPage from './components/page/SettingsPage';

export default function App() {
  return (
    // these ids are needed by the mobile nav menu for its push effect
    <div id="outer-container">
      <NavContainer />
      <div className="Content" id="page-wrap">
        <Route path="/u/:username" component={ProfilePage} />
        <Route path="/t/:id" component={TweetPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/compose" component={Lazy} />
        <Route path="/settings" component={SettingsPage} />
        <Route exact path="/" component={HomePage} />
      </div>
      <ErrorsContainer />
    </div>
  );
}
