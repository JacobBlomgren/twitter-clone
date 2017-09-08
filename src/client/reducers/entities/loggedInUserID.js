import { LOGIN_SUCCESS } from '../../actions/auth';

export default function(state = '', action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.userID;
    default:
      return state;
  }
}
