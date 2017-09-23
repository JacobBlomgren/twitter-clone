import React from 'react';
import { Router, Route, NavLink, browserHistory } from 'react-router-dom';

import ProfilePage from './components/page/ProfilePage';
import ErrorsContainer from './containers/ErrorsContainer';

function App() {
  return (
    <div>
      <NavLink to="/u/jacob">link</NavLink>
      {/*<Router history={browserHistory} >*/}
      <Route path="/u/:username" component={ProfilePage} />
      {/*</Router>*/}
      <ErrorsContainer />
    </div>
  );
}

export default App;
