import { combineReducers } from 'redux';

import loggedInUserID from './loggedInUserID';
import users from './users';
import tweets from './tweets';
import replies from './replies';

export default combineReducers({
  loggedInUserID,
  users,
  tweets,
  replies,
});
