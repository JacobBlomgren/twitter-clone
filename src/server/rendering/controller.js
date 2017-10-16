import { getUser } from '../db/queries/user/index';
import initStore from './initStore';
import {
  fetchProfileNotFound,
  fetchProfileSuccess,
} from '../../shared/actions/profile';
import getTweetWithReplies from '../db/queries/tweet/getTweet/getTweetWithReplies';
import { fetchTweetSuccess } from '../../shared/actions/tweetDetails';

export async function profile(username, loggedInUserID) {
  const response = await getUser(undefined, username, loggedInUserID);
  if (!response) return initStore(fetchProfileNotFound(username));
  return initStore(fetchProfileSuccess(response));
}

export async function tweet(tweetID, loggedInUserID) {
  const response = await getTweetWithReplies(tweetID, loggedInUserID);
  // if (!response)
  return initStore(fetchTweetSuccess(response));
}
