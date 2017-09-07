import { combineReducers } from 'redux';

import entities from './entities';

export default combineReducers({
  entities,
  ui: (s = null) => s,
});
