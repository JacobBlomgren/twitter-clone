import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../shared/reducers/index';
import { isProd } from '../shared/utils/isProd';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let preloadedState;

if (isProd) {
  preloadedState = window.__PRELOADED_STATE__;

  // remove the property from the object to allow it to eventually be garbage collected.
  delete window.__PRELOADED_STATE__;
}
/* eslint-enable no-underscore-dangle */

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
