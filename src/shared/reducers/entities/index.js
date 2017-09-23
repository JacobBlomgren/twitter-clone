import { combineReducers } from 'redux';

import loggedInUserID from './loggedInUserID';
import users from './users';
import tweets from './tweets';

export default combineReducers({
  loggedInUserID,
  users,
  tweets,
});
