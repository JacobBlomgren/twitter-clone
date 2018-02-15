import LazyLoad from '../shared/components/ComposeTweet/LazyLoadComposeTweet';
import { fetchFollowing } from '../shared/actions/following';
import { fetchProfile } from '../shared/actions/profile';

let fetchedCompose = false;

function compose(dispatch, state) {
  LazyLoad.preload();
  const time = Date.now() - state.network.following.recievedAt / (1000 * 60);
  if (!state.network.following.fetching && time > 15)
    dispatch(fetchFollowing());
}

// Fetches the logged in user as long if it isn't already fetched or in the
// process of being fetched.
function fetchLoggedInUser(store, state) {
  const loggedInUser = state.entities.login.user;
  if (
    (!state.entities.users[loggedInUser.id] ||
      state.entities.users[loggedInUser.id].partial) &&
    !state.network.user.fetching.includes(loggedInUser.username)
  ) {
    store.dispatch(fetchProfile(loggedInUser.username));
  }
}

/**
 * Higher order function that, given a store, returns a subscriber for that
 * store's state changes. Prefetches certain dependencies based on the state.
 * Currently only prefetches the Compose Tweet bundle and the logged in user's
 * data.
 */
export function subscriber(store) {
  return () => {
    const state = store.getState();
    if (state.entities.login.user && !fetchedCompose) {
      fetchedCompose = true;
      setTimeout(() => compose(store.dispatch, store.getState()), 3000);
      fetchLoggedInUser(store, state);
    }
  };
}

/**
 * Prefetching based on initial store state.
 */
export function onLoad(store) {
  const state = store.getState();
  if (state.entities.login.user) {
    fetchedCompose = true;
    setTimeout(() => compose(store.dispatch, store.getState()), 3000);
    fetchLoggedInUser(store, state);
  }
}
