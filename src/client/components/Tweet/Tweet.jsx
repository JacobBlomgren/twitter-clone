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
  replyCount,
  retweetCount,
  likeCount,
  liked,
  onLike,
}) {
  return (
    <div className="Tweet SmallPadding">
      <TweetInfo name={name} username={username} createdAt={createdAt} />
      <TweetContent content={content} />
      <TweetActions
        replyCount={replyCount}
        retweetCount={retweetCount}
        likeCount={likeCount}
        liked={liked}
        onLike={onLike}
      />
    </div>
  );
}

Tweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  replyCount: PropTypes.number.isRequired,
  retweetCount: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};
