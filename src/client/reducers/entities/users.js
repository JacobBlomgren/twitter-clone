import R from 'ramda';

import {
  PROFILE_REQUEST,
  RECIEVE_PROFILE_SUCCESS,
} from '../../actions/profile';

function requestProfile(state, action) {
  return R.assocPath(['byID', action.userID, 'isFetching'], true, state);
}

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
    case PROFILE_REQUEST:
      return requestProfile(state, action);
    case RECIEVE_PROFILE_SUCCESS:
      return recieveProfile(state, action);
    default:
      return state;
  }
}
