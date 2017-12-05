import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import ErrorsContainer from './containers/ErrorsContainer';
import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import LoginPage from './components/page/LoginPage';
import Lazy from './components/ComposeTweet/Lazy';

export default function App() {
  return (
    <div id="outer-container">
      <Nav />
      <div className="Content" id="page-wrap">
        <Route path="/u/:username" component={ProfilePage} />
        <Route path="/t/:id" component={TweetPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/compose" component={Lazy} />
      </div>
      <ErrorsContainer />
    </div>
  );
}
