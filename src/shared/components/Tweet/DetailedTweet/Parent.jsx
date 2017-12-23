import React from 'react';
import * as R from 'ramda';

import Tweet from '../Tweet';

export default function Parent(props) {
  return <Tweet {...R.dissoc('replyTo', props)} />;
}
