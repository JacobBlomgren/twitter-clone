import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../actions/auth';

export default function(state = {}, action) {
  const { userID, username, message, errorID } = action;
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { user: { id: userID, username } };
    case LOGIN_FAILURE:
      return { error: { message, id: errorID } };
    case LOGOUT_SUCCESS:
      return {};
    default:
      return state;
  }
}
