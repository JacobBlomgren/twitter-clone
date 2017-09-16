import R from 'ramda';
import camelizeKeys from '../utils/camelizeKeys';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
function requestProfile(userID) {
  return {
    type: PROFILE_REQUEST,
    userID,
  };
}

export const RECIEVE_PROFILE_SUCCESS = 'RECIEVE_PROFILE_SUCCESS';
function recieveProfileSuccess(user) {
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
    type: RECIEVE_PROFILE_SUCCESS,
    user: {
      ...userNormalized,
      recievedAt: Date.now(),
    },
    tweets,
  };
}

export function fetchUser(userID) {
  return dispatch => {
    dispatch(requestProfile(userID));
    return fetch(`/api/users/${userID}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(json => dispatch(recieveProfileSuccess(json)));
  };
}
