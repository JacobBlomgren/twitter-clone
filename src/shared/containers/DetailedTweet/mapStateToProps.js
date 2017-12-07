function findParents(tweets, parents, id) {
  if (!tweets[id].replyTo) return [tweets[id].id, ...parents];
  return findParents(tweets, [tweets[id].id, ...parents], tweets[id].replyTo);
}

// Finds replies to a certain depth limit.
function findRepliesRecursion(levels, limit, replyTable, id) {
  if (levels === limit) return { id };
  return {
    id,
    replies:
      replyTable[id] &&
      replyTable[id].map(id2 =>
        findRepliesRecursion(levels + 1, limit, replyTable, id2),
      ),
  };
}

function findReplies(replyTable, id) {
  return findRepliesRecursion(0, 3, replyTable, id).replies;
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
  const replies = state.entities.replies.byID[id]
    ? findReplies(state.entities.replies.byID, id)
    : [];
  return {
    id,
    shouldFetch: false,
    recievedAt: tweet.recievedAt,
    parents,
    replies,
    fetching,
  };
}
