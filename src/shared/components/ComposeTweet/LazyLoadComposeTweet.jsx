import React from 'react';
import Loadable from 'react-loadable';
import Spinner from '../Spinners/Spinner';

// LazyLoad load ComposeTweet with its heavy draft.js dependency, which is not needed for instance when
// the user is not logged in.
const LazyLoad = Loadable({
  loader: () => import('../../containers/ComposeTweetContainer'),
  loading() {
    return <Spinner fullPage />;
  },
});

export default LazyLoad;
