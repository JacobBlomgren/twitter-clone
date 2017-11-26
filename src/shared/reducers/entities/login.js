import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../actions/auth';

export default function(state = {}, action) {
  const { userID, message, errorID: id } = action;
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { user: userID };
    case LOGIN_FAILURE:
      return { error: { message, id } };
    default:
      return state;
  }
}
