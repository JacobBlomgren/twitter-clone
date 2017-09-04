import React from 'react';
import PropTypes from 'prop-types';

import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent';
import TweetActions from './TweetActions';

export default function Tweet({
  name,
  username,
  createdAt,
  content,
  replies,
  retweets,
  likes,
}) {
  return (
    <div className="Tweet SmallPadding">
      <TweetInfo name={name} username={username} createdAt={createdAt} />
      <TweetContent content={content} />
      <TweetActions replies={replies} retweets={retweets} likes={likes} />
    </div>
  );
}

Tweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  replies: PropTypes.number.isRequired,
  retweets: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};
