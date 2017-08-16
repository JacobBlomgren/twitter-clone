import { db } from '../../../connection';
import getTweetWithTask from './getTweetWithTask';

export default async function(tweetID) {
  return db.task('get tweet', async task => getTweetWithTask(task, tweetID));
}
