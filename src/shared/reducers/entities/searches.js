import * as R from 'ramda';

import { SEARCH_USER_SUCCESS } from '../../actions/search';

export default function searches(state = {}, action) {
  if (action.type === SEARCH_USER_SUCCESS)
    return { ...state, [action.query]: R.pluck('id', action.users) };
  return state;
}
