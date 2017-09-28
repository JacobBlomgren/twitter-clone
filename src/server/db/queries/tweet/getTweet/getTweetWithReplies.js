import { db } from '../../../connection';
import getQueryFile from '../../../getQueryFile';
import getTweetWithTask from './getTweetWithTask';

const getParents = getQueryFile('tweet/getTweet/get_parents');
const getChildren = getQueryFile('tweet/getTweet/get_children');

export default async function(tweetID, loggedInUserID) {
  return db.task('get tweet', async task => {
    const [
      tweet,
      { parent_ids: parentIDs },
      { child_ids: childIDs },
    ] = await Promise.all([
      getTweetWithTask(task, tweetID, loggedInUserID),
      task.one(getParents, tweetID),
      task.one(getChildren, tweetID),
    ]);
    if (!tweet) return Promise.resolve(null);
    console.log(parentIDs, childIDs);
    const idToQuery = id => getTweetWithTask(task, id, loggedInUserID);
    const [parents, children] = await Promise.all([
      parentIDs
        ? await Promise.all(parentIDs.map(idToQuery))
        : Promise.resolve([]),
      childIDs
        ? await Promise.all(childIDs.map(idToQuery))
        : Promise.resolve([]),
    ]);
    return {
      tweet,
      parents,
      children,
    };
  });
}
