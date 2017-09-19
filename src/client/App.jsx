import React from 'react';

import 'bootstrap';
import './styles/main.scss';

import ProfileContainer from './containers/ProfileContainer';
import ErrorsContainer from './containers/ErrorsContainer';

function App() {
  return (
    <div>
      <ProfileContainer username={'jacob'} />
      <ErrorsContainer />
    </div>
  );
}

export default App;
