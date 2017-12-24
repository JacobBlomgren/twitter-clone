import * as R from 'ramda';
import { createSelectorCreator, defaultMemoize } from 'reselect';

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

/*
 * Compares the tweets.byID argument for findReplies based on the table sizes.
 * The only scenario in which a recomputation is necessary is if a new tweet
 * has been added (which could potentially be a reply), in which the table size
 * has changed. Otherwise findReplies only depends on the id argument.
 */
const createSelectorReplies = createSelectorCreator(
  defaultMemoize,
  (a, b) =>
    typeof a === 'object'
      ? Object.keys(a).length === Object.keys(b).length
      : a === b,
);

const findReplies = createSelectorReplies(
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

// Unlike replies, parents for a tweet never has to be recomputed as another
// parent can't possibly be created for a tweet that is already posted.
const createSelectorParents = createSelectorCreator(
  defaultMemoize,
  (a, b) => (typeof a === 'object' ? true : a === b),
);

const findParents = createSelectorParents(
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
