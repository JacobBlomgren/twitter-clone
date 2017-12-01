import { combineReducers } from 'redux';

import entities from './entities/index';
import errors from './errors';
import network from './network';

export default combineReducers({
  entities,
  errors,
  ui: (s = null) => s,
  network,
});
