import React from 'react';
import { hydrate, render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './styles/main.scss';

import App from '../shared/App';
import store from './store';
import { isProd } from '../shared/utils/isProd';

const rootEl = document.getElementById('root');

function wrapApp(AppComponent, reduxStore) {
  return (
    <Provider store={reduxStore}>
      <AppContainer>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </AppContainer>
    </Provider>
  );
}

if (isProd) {
  hydrate(wrapApp(App, store), rootEl);
} else {
  render(wrapApp(App, store), rootEl);
}

if (module.hot) {
  module.hot.accept('../shared/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/App').default;
    render(wrapApp(NextApp, store), rootEl);
  });
}
