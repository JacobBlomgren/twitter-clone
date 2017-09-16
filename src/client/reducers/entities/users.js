import R from 'ramda';

import { RECIEVE_PROFILE_SUCCESS } from '../../actions/profile';

function recieveProfile(state, action) {
  const user = {
    ...action.user,
    isFetching: false,
  };
  return {
    allIDs: R.union(state.allIDs, [user.id]),
    byID: R.mergeDeepRight(state.byID, { [user.id]: user }),
  };
}

export default function(state = { byID: {}, allIDs: [] }, action) {
  switch (action.type) {
    case RECIEVE_PROFILE_SUCCESS:
      return recieveProfile(state, action);
    default:
      return state;
  }
}
