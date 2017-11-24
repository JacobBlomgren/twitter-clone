import { db } from '../../connection';

import getQueryFile from '../../getQueryFile';

const getFollowersQueryFile = getQueryFile('user/get_followers');

export default function getFollowers(userID) {
  return db.any(getFollowersQueryFile, userID);
}
