import React from 'react';
import { Route } from 'react-router-dom';

import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import ErrorsContainer from './containers/ErrorsContainer';
import Prefetcher from './Prefetcher';

export default function App() {
  return (
    <div>
      <Route path="/u/:username" component={ProfilePage} />
      <Route path="/t/:id" component={TweetPage} />
      <Prefetcher />
      <ErrorsContainer />
    </div>
  );
}
