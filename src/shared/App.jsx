import React from 'react';
import { Route } from 'react-router-dom';

import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import ErrorsContainer from './containers/ErrorsContainer';

function App() {
  return (
    <div>
      <NavLink to="/u/jacob">link</NavLink>
      {/*<Router history={browserHistory} >*/}
      <Route path="/u/:username" component={ProfilePage} />
      {/*</Router>*/}
      <Route path="/t/:id" component={TweetPage} />
      <ErrorsContainer />
    </div>
  );
}

export default App;
