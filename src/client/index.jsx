import 'bootstrap';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './App';
import rootReducer from './reducers/';
import state from './state';
import { isProd } from '../shared/utils/isProd';

const rootEl = document.getElementById('root');

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable no-underscore-dangle */

const store = createStore(
  rootReducer,
  state,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

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
