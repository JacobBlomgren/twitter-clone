import camelizeKeys from '../utils/camelizeKeys';
import { normalizeProfileToUser, normalizeTweets } from './normalization';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
function fetchProfileRequest(username) {
  return {
    type: FETCH_PROFILE_REQUEST,
    username,
  };
}

function normalizeProfileResponse(user) {
  const { users, ...rest } = normalizeTweets(user.tweets);
  const profile = normalizeProfileToUser(user);
  return {
    users: [...users, profile],
    ...rest,
  };
}

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export function fetchProfileSuccess(profile) {
  const normalized = normalizeProfileResponse(camelizeKeys(profile));
  return {
    ...normalized,
    type: FETCH_PROFILE_SUCCESS,
  };
}

export const FETCH_PROFILE_NOT_FOUND = 'FETCH_PROFILE_NOT_FOUND';
export function fetchProfileNotFound(username) {
  return {
    type: FETCH_PROFILE_NOT_FOUND,
    username,
    time: Date.now(),
  };
}

export function fetchUser(username) {
  return dispatch => {
    dispatch(fetchProfileRequest(username));
    return fetch(`/api/user?username=${username}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(json => dispatch(fetchProfileSuccess(json)))
      .catch(err => {
        if (err.message === '404')
          return dispatch(fetchProfileNotFound(username));
        return null;
      });
  };
}
