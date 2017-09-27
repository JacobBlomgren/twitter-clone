import React from 'react';
import PropTypes from 'prop-types';

import TweetContainer from '../containers/TweetContainer';

export default function TweetList({ tweets }) {
  return (
    <ol className="TweetList">
      {tweets.map(({ id, retweet }) => (
        <li key={id} className="ListSkin">
          <TweetContainer id={id} retweet={retweet} />
        </li>
      ))}
    </ol>
  );
}

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      retweet: PropTypes.string,
    }),
  ).isRequired,
};
