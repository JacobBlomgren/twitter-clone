import React from 'react';
import PropTypes from 'prop-types';

import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent';
import TweetActions from './TweetActions';
import ReplyTo from './ReplyTo';

export default function Tweet({
  name,
  username,
  createdAt,
  content,
  replyTo,
  replyCount,
  retweetCount,
  likeCount,
  liked,
  onLike,
  onUnlike,
}) {
  return (
    <div className="Tweet SmallPadding">
      <TweetInfo name={name} username={username} createdAt={createdAt} />
      {replyTo ? <ReplyTo username={replyTo} /> : ''}
      <TweetContent content={content} />
      <TweetActions
        replyCount={replyCount}
        retweetCount={retweetCount}
        likeCount={likeCount}
        liked={liked}
        onLike={onLike}
        onUnlike={onUnlike}
      />
    </div>
  );
}

Tweet.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  replyTo: PropTypes.string,
  replyCount: PropTypes.number.isRequired,
  retweetCount: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};
