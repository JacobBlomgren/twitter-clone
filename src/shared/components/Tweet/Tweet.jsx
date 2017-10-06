import React from 'react';
import PropTypes from 'prop-types';

import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent';
import TweetActions from './TweetActions';
import ReplyTo from './ReplyTo';
import Retweet from './Retweet';
import ProfilePicture from '../Profile/ProfilePicture';
import TweetProfilePicture from './TweetProfilePicture';

export default function Tweet({
  name,
  username,
  profilePictureURL,
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
    <div
      className={`Tweet SmallPadding ${retweet
        ? 'NoUpperPadding'
        : ''} clearfix`}
    >
      {retweet ? <Retweet {...retweet} /> : ''}
      <div className="float-left clearfix">
        <TweetProfilePicture url={profilePictureURL} username={username} />
      </div>
      <div className="float-left clearfix">
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
    </div>
  );
}

Tweet.defaultProps = {
  replyTo: '',
  retweet: null,
};

Tweet.propTypes = {
  ...TweetInfo.propTypes,
  ...TweetContent.propTypes,
  replyTo: PropTypes.string,
  retweet: PropTypes.shape(Retweet.propTypes),
  ...TweetActions.propTypes,
};
