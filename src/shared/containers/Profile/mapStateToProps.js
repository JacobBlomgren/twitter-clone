import * as R from 'ramda';
import { createSelectorCreator, defaultMemoize } from 'reselect';

/**
 * Finds a user with the specified username in a list of users.
 */
export const findUser = (users, username) =>
  R.find(R.propEq('username', username), users);

function usersTweetsSelector(state, { tweets = [] }) {
  return tweets.map(id => ({
    id,
    createdAt: state.entities.tweets.byID[id].createdAt,
    retweet: null,
  }));
}

function usersRetweetsSelector(_, { retweets = [], id }) {
  return retweets.map(R.assoc('retweet', id));
}

const createSelector = createSelectorCreator(defaultMemoize, R.equals);

// combines the tweets and retweets by a user into a list sorted by createdAt
const tweetsSorted = createSelector(
  [usersTweetsSelector, usersRetweetsSelector],
  (tweets, retweets) =>
    R.pipe(
      R.union,
      R.sortWith([R.descend(R.prop('createdAt'))]),
      R.project(['id', 'retweet']),
    )(tweets, retweets),
);

export function mapStateToProps(state, { username }) {
  const fetching = state.network.user.fetching.includes(username);
  const user = findUser(Object.values(state.entities.users.byID), username);
  // Determine whether there is enough data to display the profile.
  if (!user) {
    if (state.entities.users.notFound[username])
      return { notFound: state.entities.users.notFound[username], fetching };
    return { shouldFetch: true, fetching };
  }

  if (user.partial) {
    return {
      id: user.id,
      shouldFetch: true,
      fetching,
    };
  }

  const tweets = tweetsSorted(state, user);

  return {
    ...user,
    tweets,
    loggedInUserID: state.entities.login.user && state.entities.login.user.id,
    fetching,
  };
}
