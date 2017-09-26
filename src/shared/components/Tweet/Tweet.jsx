import React from 'react';
import PropTypes from 'prop-types';

import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent';
import TweetActions from './TweetActions';
import ReplyTo from './ReplyTo';
import Retweet from './Retweet';

export default function Tweet({
  name,
  username,
  createdAt,
  content,
  replyTo,
  replyCount,
  retweet,
  retweetCount,
  retweeted,
  onRetweet,
  onRemoveRetweet,
  likeCount,
  liked,
  onLike,
  onUnlike,
}) {
  return (
    <div className="Tweet SmallPadding">
      {retweet ? <Retweet {...retweet} /> : ''}
      <TweetInfo name={name} username={username} createdAt={createdAt} />
      {replyTo ? <ReplyTo username={replyTo} /> : ''}
      <TweetContent content={content} />
      <TweetActions
        replyCount={replyCount}
        retweetCount={retweetCount}
        retweeted={retweeted}
        onRetweet={onRetweet}
        onRemoveRetweet={onRemoveRetweet}
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
  // eslint-disable-next-line react/require-default-props
  retweet: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
  }),
  retweetCount: PropTypes.number.isRequired,
  retweeted: PropTypes.bool.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onRemoveRetweet: PropTypes.func.isRequired,
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};
