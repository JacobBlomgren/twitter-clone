import R from 'ramda';

export function normalizeProfileToUser(profile) {
  return {
    // remove tweet property
    ...R.dissoc('tweets', profile),
    // store retweets separately and their timestamp to allow sorting.
    retweets: profile.tweets
      .filter(R.prop('retweet'))
      .map(t => ({ id: t.id, createdAt: t.retweet.createdAt })),
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
  return [...replyUsers, ...extractedUsers];
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