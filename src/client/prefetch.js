import Lazy from '../shared/components/ComposeTweet/Lazy';
import { fetchFollowing } from '../shared/actions/following';

let fetchedCompose = false;

function compose() {
  Lazy.preload();
  fetchFollowing();
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
      setTimeout(compose, 3000);
    }
  };
}

/**
 * Prefetching based on initial store state.
 */
export function onLoad(store) {
  if (store.getState().entities.login.user) {
    fetchedCompose = true;
    setTimeout(compose, 3000);
  }
}
