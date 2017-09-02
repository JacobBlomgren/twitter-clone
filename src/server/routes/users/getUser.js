import { getUserByID } from '../../db/queries/user/index';
import getTweetsFromUser from '../../db/queries/tweet/getTweet/getTweetsFromUser';

export default async function(req, res) {
  try {
    const [user, tweets] = await Promise.all([
      getUserByID(req.params.userID, req.loggedInUserID),
      getTweetsFromUser(req.params.userID, req.loggedInUserID),
    ]);
    res.status(200).json({
      ...user,
      tweets,
    });
  } catch (err) {
    res.status(500).end();
  }
}
