import { combineReducers } from 'redux';

import following from './following';
import tweet from './tweet';
import user from './user';

/**
 * Reducers for state about network requests, i.e. if something is currently
 * fetching, when it was last recieved, etc.
 */
export default combineReducers({
  following,
  tweet,
  user,
});
