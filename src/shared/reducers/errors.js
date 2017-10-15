import * as R from 'ramda';

import { ADD_ERROR, REMOVE_ERROR } from '../actions/error';

export default function(state = [], action) {
  switch (action.type) {
    case ADD_ERROR:
      return R.append({ message: action.message, id: action.id }, state);
    case REMOVE_ERROR:
      return R.reject(R.propEq('id', action.id), state);
    default:
      return state;
  }
}
