import R from 'ramda';

function findParents(tweets, parents, id) {
  if (!tweets[id].replyTo) return [tweets[id].id, ...parents];
  return findParents(tweets, [tweets[id].id, ...parents], tweets[id].replyTo);
}

function findChildrenRecursion(levels, limit, replies, id) {
  if (levels === limit) return { id };
  return {
    id,
    children:
      replies[id] &&
      replies[id].map(id2 =>
        findChildrenRecursion(levels + 1, limit, replies, id2),
      ),
  };
}

function findChildren(replies, id) {
  return findChildrenRecursion(0, 3, replies, id).children;
}

export default function mapStateToProps(state, { id }) {
  const tweet = state.entities.tweets.byID[id];
  if (!tweet) return {};
  if (tweet.partial) return tweet;
  const parents = tweet.replyTo
    ? findParents(state.entities.tweets.byID, [], tweet.replyTo)
    : [];
  const children = state.entities.replies.byID[id]
    ? findChildren(state.entities.replies.byID, id)
    : [];
  return {
    id,
    parents,
    children,
  };
}
