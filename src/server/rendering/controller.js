import { getUser } from '../db/queries/user/index';
import getTweetWithReplies from '../db/queries/tweet/getTweet/getTweetWithReplies';

import initStore from './initStore';

import {
  fetchProfileNotFound,
  fetchProfileSuccess,
} from '../../shared/actions/profile';
import { fetchTweetSuccess } from '../../shared/actions/tweetDetails';
import { loginSuccess } from '../../shared/actions/auth';

export async function profile(username, loggedInUserID) {
  const response = await getUser(undefined, username, loggedInUserID);
  const actions = [];
  if (!response) actions.push(fetchProfileNotFound(username));
  else actions.push(fetchProfileSuccess(response));

  if (loggedInUserID) actions.push(loginSuccess({ user_id: loggedInUserID }));
  return initStore(actions);
}

export async function tweet(tweetID, loggedInUserID) {
  const response = await getTweetWithReplies(tweetID, loggedInUserID);
  const actions = [];
  if (response) actions.push(fetchTweetSuccess(response));

  if (loggedInUserID) actions.push(loginSuccess({ user_id: loggedInUserID }));
  return initStore();
}
