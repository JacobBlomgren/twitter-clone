import { getUser } from '../db/queries/user/index';
import getTweetsFromUser from '../db/queries/tweet/getTweet/getTweetsFromUser';
import initStore from './initStore';
import { fetchProfileSuccess } from '../../shared/actions/profile';

export async function profile(username, loggedInUserID) {
  const [user, tweets] = await Promise.all([
    getUser(undefined, username, loggedInUserID),
    getTweetsFromUser(undefined, username, loggedInUserID),
  ]);
  return initStore(
    fetchProfileSuccess({
      ...user,
      tweets,
    }),
  );
}
