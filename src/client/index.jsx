import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';
import { APP_CONTAINER_ID } from '../shared/config';

import '../../public/styles/main.scss';

const rootEl = document.getElementById(APP_CONTAINER_ID);

function wrapApp(AppComponent) {
  return (
    <AppContainer>
      <AppComponent />
    </AppContainer>
  );
}

ReactDOM.render(wrapApp(App), rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
