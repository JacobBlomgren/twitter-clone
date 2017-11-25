import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import ErrorsContainer from './containers/ErrorsContainer';
import Prefetcher from './Prefetcher';

export default function App() {
  return (
    <div>
      <Nav />
      <div className="Content">
        <Route path="/u/:username" component={ProfilePage} />
        <Route path="/t/:id" component={TweetPage} />
      </div>
      <Prefetcher />
      <ErrorsContainer />
    </div>
  );
}
