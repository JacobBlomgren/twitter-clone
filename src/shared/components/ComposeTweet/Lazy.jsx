import React from 'react';
import Loadable from 'react-loadable';
import Spinner from '../Spinner';

// Lazy load ComposeTweet with its heavy draft.js dependency, which is not needed for instance when
// the user is not logged in.
const Lazy = Loadable({
  loader: () => import('./ComposeTweet'),
  loading() {
    return <Spinner fullPage />;
  },
});

export default Lazy;