import { addError } from './error';
import { normalizeTweets } from './normalization';
import camelizeKeys from '../utils/camelizeKeys';

export const FETCH_TIMELINE_REQUEST = 'FETCH_TIMELINE_REQUEST';
function fetchTimelineRequest() {
  return { type: FETCH_TIMELINE_REQUEST };
}

export const FETCH_TIMELINE_SUCCESS = 'FETCH_TIMELINE_SUCESS';
function fetchTimelineSuccess(response) {
  const normalized = normalizeTweets(camelizeKeys(response));
  return {
    type: FETCH_TIMELINE_SUCCESS,
    ...normalized,
    recievedAt: Date.now(),
  };
}

export const FETCH_TIMELINE_FAILURE = 'FETCH_TIMELINE_FAILURE';
function fetchTimelineFailure() {
  return { type: FETCH_TIMELINE_FAILURE };
}

export function fetchTimeline() {
  return dispatch => {
    dispatch(fetchTimelineRequest());
    return fetch(`/api/timeline`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then(json => dispatch(fetchTimelineSuccess(json)))
      .catch(err => {
        dispatch(fetchTimelineFailure());
        dispatch(addError("Couldn't fetch timeline"));
      });
  };
}
