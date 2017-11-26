import { combineReducers } from 'redux';

import login from './login';
import users from './users';
import tweets from './tweets';
import replies from './replies';

export default combineReducers({
  login,
  users,
  tweets,
  replies,
});
