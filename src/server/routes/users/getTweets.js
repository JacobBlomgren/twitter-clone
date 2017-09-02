import getTweetsFromUser from '../../db/queries/tweet/getTweet/getTweetsFromUser';

export default async function(req, res) {
  try {
    const response = await getTweetsFromUser(
      req.params.userID,
      req.loggedInUserID,
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(500).end();
  }
}
