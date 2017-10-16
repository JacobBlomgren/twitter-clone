import React from 'react';

import Tweet from '../Tweet';
import TweetProfilePicture from '../TweetProfilePicture';
import TweetInfo from '../TweetInfo';
import ReplyTo from '../ReplyTo';
import TweetContent from '../TweetContent';
import TweetActions from '../TweetActions';

export default function ReplyToReply({
  name,
  username,
  profilePictureURL,
  createdAt,
  content,
  replyTo,
  replyCount,
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
    <div className="ReplyToReply">
      <article className="Tweet SmallPadding clearfix">
        <div className="float-left">
          <div className="TweetProfilePicture__Column--ReplyToReply">
            <TweetProfilePicture url={profilePictureURL} username={username} />
          </div>
        </div>
        <div className="float-left">
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
      </article>
    </div>
  );
}

ReplyToReply.defaultProps = Tweet.defaultProps;

ReplyToReply.propTypes = Tweet.propTypes;
