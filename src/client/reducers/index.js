import { combineReducers } from 'redux';

import entities from './entities';
import errors from './errors';

export default combineReducers({
  entities,
  errors,
  ui: (s = null) => s,
});
