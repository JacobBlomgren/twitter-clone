import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../../shared/reducers/';

export default function(actions) {
  const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(thunkMiddleware)),
  );
  actions.forEach(store.dispatch);
  return store;
}
