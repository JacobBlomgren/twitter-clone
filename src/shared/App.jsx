import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import ErrorsContainer from './containers/ErrorsContainer';
import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import LoginPage from './components/page/LoginPage';

export default function App() {
  return (
    <div>
      <Nav />
      <div className="Content">
        <Route path="/u/:username" component={ProfilePage} />
        <Route path="/t/:id" component={TweetPage} />
        <Route path="/login" component={LoginPage} />
      </div>
      <ErrorsContainer />
    </div>
  );
}
