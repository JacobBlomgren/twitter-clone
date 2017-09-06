import React from 'react';
import PropTypes from 'prop-types';

import Tweet from './Tweet/Tweet';

export default function TweetList({ tweets }) {
  return (
    <ol className="TweetList">
      {tweets.map(tweet => (
        <li key={tweet.id} className="ListSkin">
          <Tweet
            id={tweet.id}
            name={tweet.name}
            username={tweet.username}
            content={tweet.content}
            createdAt={tweet.createdAt}
            replies={tweet.replies}
            retweets={tweet.retweets}
            likes={tweet.likes}
          />
        </li>
      ))}
    </ol>
  );
}

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
