import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/';
import { isProd } from '../shared/utils/isProd';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable no-underscore-dangle */

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
