import * as R from 'ramda';

function findParents(tweets, parents, id) {
  if (!tweets[id].replyTo) return [tweets[id].id, ...parents];
  return findParents(tweets, [tweets[id].id, ...parents], tweets[id].replyTo);
}

// Finds replies to a certain depth limit.
function findRepliesRecursion(levels, limit, tweets, id) {
  if (levels === limit) return { id };
  const replies = R.pipe(
    R.filter(t => t.replyTo && t.replyTo === id),
    R.pluck('id'),
  )(tweets);
  return {
    id,
    replies:
      replies &&
      replies.map(id2 => findRepliesRecursion(levels + 1, limit, tweets, id2)),
  };
}

function findReplies(tweets, id) {
  return findRepliesRecursion(0, 3, tweets, id).replies;
}

export default function mapStateToProps(state, { id }) {
  const fetching = state.network.tweet.fetching.includes(id);
  const tweet = state.entities.tweets.byID[id];
  // determine how much data we have.
  if (!tweet) {
    if (state.entities.tweets.notFound[id])
      return { notFound: state.entities.tweets.notFound[id], fetching };
    return { shouldFetch: true, fetching };
  }
  if (tweet.partial) {
    return {
      id: tweet.id,
      partial: true,
      shouldFetch: true,
      fetching,
    };
  }

  const parents = tweet.replyTo
    ? findParents(state.entities.tweets.byID, [], tweet.replyTo)
    : [];

  const replies = findReplies(Object.values(state.entities.tweets.byID), id);
  return {
    id,
    shouldFetch: false,
    recievedAt: tweet.recievedAt,
    parents,
    replies,
    fetching,
  };
}
