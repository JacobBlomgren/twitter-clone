import {
  SEARCH_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILURE,
} from '../../actions/search';

export default function search(state = { fetching: false }, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { fetching: true };
    case SEARCH_USER_SUCCESS:
    case SEARCH_USER_FAILURE:
      return { fetching: false };
    default:
      return state;
  }
}
