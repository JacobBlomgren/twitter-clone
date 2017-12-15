import { combineReducers } from 'redux';

import auth from './auth';
import following from './following';
import timeline from './timeline';
import tweet from './tweet';
import user from './user';

/**
 * Reducers for state about network requests, i.e. if something is currently
 * fetching, when it was last recieved, etc.
 */
export default combineReducers({
  auth,
  following,
  timeline,
  tweet,
  user,
});
