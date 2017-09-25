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
export function fetchProfileSuccess(user) {
  const userCamelized = camelizeKeys(user);
  const userNormalized = R.evolve(
    {
      // Transform the array of tweet objecs to an array of their ids
      tweets: R.map(R.prop('id')),
    },
    userCamelized,
  );
  userNormalized.recievedAt = Date.now();
  // Normalize all tweets by removing all user related data.
  const tweets = userCamelized.tweets.map(
    R.compose(
      t => ({ ...t, replyTo: t.replyTo ? t.replyTo.originalUserID : null }),
      R.omit(['name', 'username']),
    ),
  );
  // extract the user data from all the tweets that were replies to other tweets.
  const replyUsers = userCamelized.tweets
    .filter(t => t.replyTo && t.replyTo.originalUserID !== user.id)
    .map(({ replyTo }) => ({
      id: replyTo.originalUserID,
      username: replyTo.originalUsername,
      partial: true,
    }));

  return {
    type: FETCH_PROFILE_SUCCESS,
    users: [...replyUsers, userNormalized],
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
