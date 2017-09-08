import { combineReducers } from 'redux';

import tweets from './tweets';

export default combineReducers({
  loggedInUser: (s = null) => s,
  users: (s = { byID: {}, allIDs: {} }) => s,
  tweets,
});
