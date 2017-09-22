import R from 'ramda';
import camelizeKeys from '../utils/camelizeKeys';

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
function fetchProfileRequest(username) {
  return {
    type: FETCH_PROFILE_REQUEST,
    username,
  };
}

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
function fetchProfileSuccess(user) {
  const userCamelized = camelizeKeys(user);
  const userNormalized = R.evolve(
    {
      // Transform the array of tweet objecs to an array of their ids
      tweets: R.map(R.prop('id')),
    },
    userCamelized,
  );
  const tweets = userCamelized.tweets.map(R.omit(['name', 'username']));
  return {
    type: FETCH_PROFILE_SUCCESS,
    user: {
      ...userNormalized,
      recievedAt: Date.now(),
    },
    tweets,
  };
}

export function fetchUser(username) {
  return dispatch => {
    dispatch(fetchProfileRequest(username));
    return fetch(`/api/user?username=${username}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => dispatch(fetchProfileSuccess(json)));
  };
}
