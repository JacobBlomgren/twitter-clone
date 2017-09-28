import { db } from '../../../connection';
import getQueryFile from '../../../getQueryFile';
import getTweetWithTask from './getTweetWithTask';

const getReplies = getQueryFile('tweet/getTweet/get_replies');

export default async function(tweetID, loggedInUserID) {
  return db.task('get tweet', async task => {
    const [tweet, { parent_ids, children_ids }] = await Promise.all([
      getTweetWithTask(task, tweetID, loggedInUserID),
      task.one(getReplies, tweetID),
    ]);
    if (!tweet) return Promise.resolve(null);

    const idToQuery = id => getTweetWithTask(task, id, loggedInUserID);
    const parentQueries = parent_ids.map(idToQuery);
    const childrenQueries = children_ids.map(idToQuery);
    const [parents, children] = await Promise.all([
      await Promise.all(parentQueries),
      await Promise.all(childrenQueries),
    ]);
    return {
      tweet,
      parents,
      children,
    };
  });
}
