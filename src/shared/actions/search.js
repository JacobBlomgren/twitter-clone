import * as R from 'ramda';
import { addError } from './error';
import { normalizePartialUsers } from './normalization';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
function searchRequest(term) {
  return {
    type: SEARCH_REQUEST,
    term,
  };
}

export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
function searchUserSuccess(result) {
  const { query, matches } = result;
  return {
    type: SEARCH_USER_SUCCESS,
    query,
    ...normalizePartialUsers(matches),
    recievedAt: Date.now(),
  };
}

export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';
function searchUserFailure() {
  return { type: SEARCH_USER_FAILURE };
}

export function search(callback, query) {
  return dispatch => {
    dispatch(searchRequest(query));
    if (R.head(query) !== '@') {
      return fetch(`/api/search/users?q=${query}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => {
          if (!response.ok) throw Error(response.status);
          return response.json();
        })
        .then(result => {
          dispatch(searchUserSuccess(result));
          callback(query);
        })
        .catch(() => {
          dispatch(searchUserFailure());
          return dispatch(addError("Couldn't fetch data"));
        });
    }
    // TODO
    return Promise.reject(query);
  };
}
