import 'bootstrap';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import state from './state';

const rootEl = document.getElementById('root');

const store = createStore(s => s, state);

function wrapApp(AppComponent, reduxStore) {
  return (
    <Provider store={reduxStore}>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </Provider>
  );
}

render(wrapApp(App, store), rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(wrapApp(NextApp, store), rootEl);
  });
}
