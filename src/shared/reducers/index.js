import { combineReducers } from 'redux';

import entities from './entities/index';
import errors from './errors';

export default combineReducers({
  entities,
  errors,
  ui: (s = null) => s,
});
