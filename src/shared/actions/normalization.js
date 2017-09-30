import R from 'ramda';

const isRetweet = R.has('retweet');

export function normalizeProfileToUser(profile) {
  return {
    ...profile,
    // Transform the array of tweet objecs to an array of their ids
    tweets: profile.tweets
      .filter(R.propEq('userID', profile.id))
      .map(R.prop('id')),
    // store retweets separately and their timestamp to allow sorting.
    retweets: profile.tweets
      .filter(isRetweet)
      .map(t => ({ id: t.id, createdAt: t.retweet.createdAt })),
    partial: false,
    recievedAt: Date.now(),
  };
}

export function normalizeTweets(tweets) {
  const replies = tweets.filter(R.has('replyTo'));
  const replyUsers = R.pipe(
    // extract the user data from replyTo
    R.map(({ replyTo }) => ({
      id: replyTo.originalUserID,
      username: replyTo.originalUsername,
      partial: true,
    })),
    R.uniq,
    R.map(u => ({
      ...u,
      tweets: replies
        .filter(t => t.replyTo.originalUserID === u.id)
        .map(t => t.replyTo.originalTweetID),
    })),
  )(replies);

  const extractedUsers = R.pipe(
    R.map(({ username, name, userID }) => ({
      username,
      name,
      id: userID,
      partial: true,
    })),
    R.uniq,
    R.map(u => ({
      ...u,
      tweets: tweets.filter(R.propEq('userID', u.id)).map(R.prop('id')),
    })),
  )(tweets);

  return {
    users: [...replyUsers, ...extractedUsers],
    tweets: tweets.map(R.omit(['name', 'username', 'retweet'])),
  };
}
