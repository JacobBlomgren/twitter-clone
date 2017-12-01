import { combineReducers } from 'redux';

import following from './following';

/**
 * Reducers for state about network requests, i.e. if something is currently
 * fetching, when it was last recieved, etc.
 */
export default combineReducers({
  following,
});
