import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const rootEl = document.getElementById('root');

function wrapApp(AppComponent) {
  return (
    <AppContainer>
      <AppComponent />
    </AppContainer>
  );
}

ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
