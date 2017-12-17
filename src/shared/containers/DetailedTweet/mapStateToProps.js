import * as R from 'ramda';
import { createSelector } from 'reselect';

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

function tweetsByIDSelector(state) {
  return state.entities.tweets.byID;
}

function IDSelector(_, id) {
  return id;
}

const findReplies = createSelector(
  [tweetsByIDSelector, IDSelector],
  (tweets, id) => findRepliesRecursion(0, 3, Object.values(tweets), id).replies,
);

function findParentsRecursion(tweets, parents, id) {
  if (!tweets[id].replyTo) return [tweets[id].id, ...parents];
  return findParentsRecursion(
    tweets,
    [tweets[id].id, ...parents],
    tweets[id].replyTo,
  );
}

const findParents = createSelector(
  [tweetsByIDSelector, IDSelector],
  (tweets, id) => {
    const { replyTo } = tweets[id];
    return replyTo ? findParentsRecursion(tweets, [], replyTo) : [];
  },
);

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

  const parents = findParents(state, id);
  const replies = findReplies(state, id);
  return {
    id,
    shouldFetch: false,
    recievedAt: tweet.recievedAt,
    parents,
    replies,
    fetching,
  };
}
