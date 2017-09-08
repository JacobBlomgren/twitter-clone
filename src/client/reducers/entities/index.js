import { combineReducers } from 'redux';

import loggedInUserID from './loggedInUserID';
import tweets from './tweets';

export default combineReducers({
  loggedInUserID,
  users: (s = { byID: {}, allIDs: {} }) => s,
  tweets,
});
