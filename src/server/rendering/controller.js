import { getUser } from '../db/queries/user/index';
import getTweetWithReplies from '../db/queries/tweet/getTweet/getTweetWithReplies';

import initStore from './initStore';

import {
  fetchProfileNotFound,
  fetchProfileSuccess,
} from '../../shared/actions/profile';
import {
  fetchTweetNotFound,
  fetchTweetSuccess,
} from '../../shared/actions/tweet';
import { loginSuccess } from '../../shared/actions/auth';
import getTimeLine from '../db/queries/timeline';
import {
  fetchTimelineFailure,
  fetchTimelineSuccess,
} from '../../shared/actions/timeline';
import { getFollowing } from '../db/queries/follow';
import {
  fetchFollowingFailure,
  fetchFollowingSuccess,
} from '../../shared/actions/following';

/**
 * Returns a Redux store initialized with everything necessary to render
 * the profile page.
 */
export async function profile(username, loggedInUserID) {
  const response = await getUser(undefined, username, loggedInUserID);
  const actions = [];
  // It's important to dispatch log in before anything else to get followed/liked/retweeted data.
  // Otherwise that data will be invalidated.
  if (loggedInUserID) actions.push(loginSuccess({ user_id: loggedInUserID }));

  if (!response) actions.push(fetchProfileNotFound(username));
  else actions.push(fetchProfileSuccess(response));
  return initStore(actions);
}

/**
 * Returns a Redux store initialized with everything necessary to render
 * the tweet page.
 */
export async function tweet(tweetID, loggedInUserID) {
  const response = await getTweetWithReplies(tweetID, loggedInUserID);
  const actions = [];
  if (loggedInUserID) actions.push(loginSuccess({ user_id: loggedInUserID }));

  if (response) actions.push(fetchTweetSuccess(response));
  else actions.push(fetchTweetNotFound(tweetID));
  return initStore(actions);
}

/**
 * Returns a Redux store initialized with everything necessary to render
 * the timeline page.
 */
export async function timeline(loggedInUserID) {
  const response = await getTimeLine(loggedInUserID);
  const actions = [loginSuccess({ user_id: loggedInUserID })];

  if (response) actions.push(fetchTimelineSuccess(response));
  else actions.push(fetchTimelineFailure());
  return initStore(actions);
}

/**
 * Returns a Redux store initialized with everything necessary to render
 * the settings page.
 */
export async function settings(loggedInUserID) {
  if (!loggedInUserID) return initStore([]);
  const response = await getUser(loggedInUserID, undefined, loggedInUserID);
  const actions = [loginSuccess({ user_id: loggedInUserID })];

  if (!response) return Promise.reject();
  actions.push(fetchProfileSuccess(response));
  return initStore(actions);
}

/**
 * Returns a Redux store initialized with everything necessary to render
 * the login page.
 */
export async function login(loggedInUserID) {
  return loggedInUserID ? [loginSuccess({ user_id: loggedInUserID })] : [];
}

export async function compose(loggedInUserID) {
  if (!loggedInUserID) return initStore([]);
  const response = await getFollowing(loggedInUserID);
  const actions = [loginSuccess({ user_id: loggedInUserID })];

  if (response) actions.push(fetchFollowingSuccess(response));
  else actions.push(fetchFollowingFailure(response));
  return initStore(actions);
}
