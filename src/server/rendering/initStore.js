import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../../shared/reducers/';

export default function(action) {
  const store = createStore(
    rootReducer,
    undefined,
    compose(applyMiddleware(thunkMiddleware)),
  );
  store.dispatch(action);
  return store;
}
