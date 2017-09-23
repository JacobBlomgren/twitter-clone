import React from 'react';
import PropTypes from 'prop-types';

import TweetContainer from '../containers/TweetContainer';

export default function TweetList({ tweets }) {
  return (
    <ol className="TweetList">
      {tweets.map(tweetID => (
        <li key={tweetID} className="ListSkin">
          <TweetContainer tweetID={tweetID} />
        </li>
      ))}
    </ol>
  );
}

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.string).isRequired,
};
