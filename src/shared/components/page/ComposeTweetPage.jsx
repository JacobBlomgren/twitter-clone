import React from 'react';
import Helmet from 'react-helmet';

import RedirectOnNotLoggedIn from './RedirectOnNotLoggedIn';
import LazyLoad from '../ComposeTweet/LazyLoadComposeTweet';

export default function ComposePage() {
  return (
    <div>
      <Helmet title="Compose tweet" />
      <RedirectOnNotLoggedIn>
        <LazyLoad />
      </RedirectOnNotLoggedIn>
    </div>
  );
}
