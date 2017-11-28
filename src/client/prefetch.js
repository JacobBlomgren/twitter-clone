import Lazy from '../shared/components/ComposeTweet/Lazy';

let fetchedCompose = false;

// Higher order function that, given a store, returns a subscriber for that store's state changes.
// Prefetches certain dependencies based on the state. Currently only prefetches the Compose Tweet bundle.
export function subscriber(store) {
  return () => {
    const state = store.getState();
    if (state.entities.login.user && !fetchedCompose) {
      fetchedCompose = true;
      setTimeout(Lazy.preload, 3000);
    }
  };
}

// Prefetching based on initial store state.
export function onLoad(store) {
  console.log(store.getState().entities.login.user);
  if (store.getState().entities.login.user) {
    fetchedCompose = true;
    setTimeout(Lazy.preload, 3000);
  }
}
