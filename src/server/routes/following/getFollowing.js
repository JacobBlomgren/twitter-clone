import { getFollowing } from '../../db/queries/follow';

export default async function(req, res) {
  try {
    const response = await getFollowing(req.loggedInUserID);
    return res.status(200).json(response);
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}
