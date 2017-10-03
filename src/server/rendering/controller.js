import { getUser } from '../db/queries/user/index';
import initStore from './initStore';
import {
  fetchProfileNotFound,
  fetchProfileSuccess,
} from '../../shared/actions/profile';

export async function profile(username, loggedInUserID) {
  const user = await getUser(undefined, username, loggedInUserID);
  if (!user) return initStore(fetchProfileNotFound(username));
  return initStore(fetchProfileSuccess(user));
}
