import React from 'react';
import Loadable from 'react-loadable';
import Spinner from '../Spinners/Spinner';

// Lazy load ComposeTweet with its heavy draft.js dependency, which is not needed for instance when
// the user is not logged in.
const Lazy = Loadable({
  loader: () => import('../../containers/ComposeTweetContainer'),
  loading() {
    return <Spinner fullPage />;
  },
});

export default Lazy;
