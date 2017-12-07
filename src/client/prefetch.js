import Lazy from '../shared/components/ComposeTweet/Lazy';
import { fetchFollowing } from '../shared/actions/following';
import { fetchProfile } from '../shared/actions/profile';

let fetchedCompose = false;

function compose(dispatch) {
  return () => {
    Lazy.preload();
    dispatch(fetchFollowing());
  };
}

/**
 * Higher order function that, given a store, returns a subscriber for that store's state changes.
 * Prefetches certain dependencies based on the state. Currently only prefetches the Compose Tweet bundle.
 */
export function subscriber(store) {
  return () => {
    const state = store.getState();
    if (state.entities.login.user && !fetchedCompose) {
      fetchedCompose = true;
      setTimeout(compose(store.dispatch), 3000);
      const loggedInUser = state.entities.login.user.username;
      if (!state.network.user.fetching.includes(loggedInUser))
        store.dispatch(fetchProfile(loggedInUser));
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
    setTimeout(compose(store.dispatch), 3000);
    store.dispatch(fetchProfile(state.entities.login.user.username));
  }
}
