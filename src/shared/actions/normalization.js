import R from 'ramda';

export function normalizeProfileToUser(profile) {
  return {
    // remove tweet property
    ...R.dissoc('tweets', profile),
    partial: false,
    recievedAt: Date.now(),
  };
}

function normalizeUsersFromTweets(tweets) {
  const replies = tweets.filter(R.prop('replyTo'));
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

  const retweets = tweets.filter(R.prop('retweet'));
  const retweetUsers = R.pipe(
    R.map(({ retweet: { userID, name, username } }) => ({
      id: userID,
      name,
      username,
      partial: true,
      // store retweets separately and their timestamp to allow sorting.
      retweets: retweets.filter(t => t.retweet.userID === userID).map(t => ({
        id: t.id,
        createdAt: t.retweet.createdAt,
      })),
    })),
    R.uniq,
  )(retweets);

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
  return [...replyUsers, ...retweetUsers, ...extractedUsers];
}

function normalizeTweetData(tweets) {
  const normalized = tweets.map(
    R.pipe(R.omit(['name', 'username', 'retweet']), t => ({
      ...t,
      replyTo: t.replyTo && t.replyTo.originalTweetID,
    })),
  );
  const replies = tweets.filter(R.prop('replyTo')).map(t => ({
    id: t.replyTo.originalTweetID,
    userID: t.replyTo.originalUserID,
  }));
  return [...normalized, ...replies];
}

function normalizeReplies(tweets) {
  return tweets.filter(R.prop('replyTo')).reduce((acc, t) => {
    const list = acc[t.replyTo.originalTweetID] || [];
    return {
      ...acc,
      [t.replyTo.originalTweetID]: [...list, t.id],
    };
  }, {});
}

export function normalizeTweets(tweets) {
  return {
    users: normalizeUsersFromTweets(tweets),
    tweets: normalizeTweetData(tweets),
    replies: normalizeReplies(tweets),
  };
}
