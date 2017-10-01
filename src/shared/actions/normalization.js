import R from 'ramda';

/**
 * Normalizes a profile response.
 */
export function normalizeProfileToUser(profile) {
  return {
    // remove tweet property
    ...R.dissoc('tweets', profile),
    partial: false,
    recievedAt: Date.now(),
  };
}

/*
  Extracts all user data contained in an array of tweet, i.e. data for author of tweets,
  replies and retweets.
*/
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

/*
  Removes all non-tweet data, that is data pertaining to the author of the tweet, username, etc,
  and also extracts the data from replyTo
 */
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

/*
 Computes an array of the IDs of all replies to every tweet, akin to a view table in SQL.
 Although this is data duplication, it eliminates the need for expensive loops through the whole
 tweet table, to find all replies to a tweet.
 */
function computeReplies(tweets) {
  return tweets.filter(R.prop('replyTo')).reduce((acc, t) => {
    const list = acc[t.replyTo.originalTweetID] || [];
    return {
      ...acc,
      [t.replyTo.originalTweetID]: [...list, t.id],
    };
  }, {});
}

/**
 * Normalizes an array of tweets.
 * @returns {{users, tweets, replies}}
 */
export function normalizeTweets(tweets) {
  return {
    users: normalizeUsersFromTweets(tweets),
    tweets: normalizeTweetData(tweets),
    replies: computeReplies(tweets),
  };
}
