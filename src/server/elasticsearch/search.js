import client from '../../../lib/elasticsearch/elasticsearch';
import { db } from '../db/connection';
import getQueryFile from '../db/getQueryFile';

const searchQueryFile = getQueryFile('user/get_users_with_ids');

// eslint-disable-next-line import/prefer-default-export
export async function searchUsers(term, loggedInUserID) {
  const { hits: { hits } } = await client.search({
    index: 'twitter',
    body: {
      query: {
        bool: {
          should: [
            { match: { name: term }},
            { match: { username: term }},
          ],
        },
      },
    },
    type: 'user',
  });
  // eslint-disable-next-line no-underscore-dangle
  const ids = hits.map(h => h._id);
  return db.any(searchQueryFile, [ids, loggedInUserID]);
}
