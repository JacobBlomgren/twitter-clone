import React from 'react';
import RedirectOnNotLoggedIn from './RedirectOnNotLoggedIn';
import LazyLoad from '../ComposeTweet/LazyLoadComposeTweet';

export default function ComposePage() {
  return (
    <RedirectOnNotLoggedIn>
      <LazyLoad />
    </RedirectOnNotLoggedIn>
  );
}
