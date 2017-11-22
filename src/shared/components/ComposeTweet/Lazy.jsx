import React from 'react';
import Bundle from '../Bundle/Bundle';
import Spinner from '../Spinner';
import ComposeTweet from './ComposeTweet';

export default function Lazy() {
  return (
    <Bundle load={ComposeTweet}>
      {Comp => (Comp ? <Comp /> : <Spinner fullPage />)}
    </Bundle>
  );
}

Lazy.propTypes = {};
