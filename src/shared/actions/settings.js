import headers from '../utils/fetch/jsonHeaders';
import { addError } from './error';

export const UPDATE_SETTINGS_REQUEST = 'UPDATE_SETTINGS_REQUEST';
function updateSettingsRequest() {
  return {
    type: UPDATE_SETTINGS_REQUEST,
  };
}

export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
function updateSettingsSuccess(name, description, loggedInUserID) {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
    name,
    description,
    loggedInUserID,
  };
}

export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';
function updateSettingsFailure() {
  return {
    type: UPDATE_SETTINGS_FAILURE,
  };
}

export function updateSettings(name, description) {
  return (dispatch, getState) => {
    dispatch(updateSettingsRequest());
    return fetch('/api/settings', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name, description }),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        const loggedInUserID = getState().entities.login.user.id;
        return dispatch(
          updateSettingsSuccess(name, description, loggedInUserID),
        );
      })
      .catch(() => {
        dispatch(addError('Something went wrong'));
        return dispatch(updateSettingsFailure());
      });
  };
}
