import {
  UPDATE_SETTINGS_FAILURE,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
} from '../../actions/settings';

export default function settings(state = { posting: false }, action) {
  switch (action.type) {
    case UPDATE_SETTINGS_REQUEST:
      return { posting: true };
    case UPDATE_SETTINGS_FAILURE:
    case UPDATE_SETTINGS_SUCCESS:
      return { posting: false };
    default:
      return state;
  }
}
