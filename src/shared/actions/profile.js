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
  const userNormalized = {
    ...userCamelized,
    // Transform the array of tweet objecs to an array of their ids
    tweets: userCamelized.tweets
      .filter(R.propEq('userID', userCamelized.id))
      .map(R.prop('id')),
    partial: false,
    recievedAt: Date.now(),
  };

  const tweets = userCamelized.tweets.map(
    R.compose(
      t => ({ ...t, replyTo: t.replyTo ? t.replyTo.originalUserID : null }),
      t => ({ ...t, retweet: t.retweet ? t.retweet.userID : null }),
      // Normalize all tweets by removing all user related data.
      R.omit(['name', 'username']),
    ),
  );

  const replies = userCamelized.tweets.filter(
    t => t.replyTo && t.replyTo.originalUserID !== user.id,
  );

  // extract the user data from all the tweets that were replies to other tweets.
  const replyUsers = replies.map(({ replyTo }) => ({
    id: replyTo.originalUserID,
    username: replyTo.originalUsername,
    partial: true,
  }));

  const retweets = userCamelized.tweets.filter(R.has('retweet'));

  const retweetUsers = R.compose(
    R.map(u => ({
      ...u,
      tweets: retweets.filter(R.propEq('userID', u.id)).map(R.prop('id')),
    })),
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
    users: [...R.uniq(replyUsers), ...R.uniq(retweetUsers), userNormalized],
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
