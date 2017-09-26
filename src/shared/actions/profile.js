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
  console.log(userCamelized);
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
      t => ({ ...t, retweet: t.retweet ? t.retweet.userID : null }),
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

  // TODO add tweets array to retweetUsers
  const retweets = userCamelized.tweets.filter(R.has('retweet'));

  const retweetUsers = R.compose(
    R.uniq,
    R.map(({ username, name, userID }) => ({
      username,
      name,
      id: userID,
      partial: true,
    })),
  )(retweets);

  return {
    type: FETCH_PROFILE_SUCCESS,
    users: [...replyUsers, ...retweetUsers, userNormalized],
    tweets,
  };
}

export function fetchUser(username) {
  console.log('fetching user');
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
