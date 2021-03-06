import React from 'react';

import Tweet from '../Tweet';
import TweetProfilePicture from '../TweetProfilePicture';
import TweetInfo from '../TweetInfo';
import ReplyTo from '../ReplyTo';
import TweetContent from '../TweetContent';
import TweetActions from '../TweetActions';
import TweetLink from '../TweetLink';

export default function ReplyToReply({
  id,
  name,
  username,
  profilePictureURL,
  createdAt,
  loggedIn,
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
    <TweetLink id={id}>
      <article className="Tweet clearfix ReplyToReply SmallPadding--Sides SmallPadding--Bottom">
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
            id={id}
            replyCount={replyCount}
            retweetCount={retweetCount}
            retweeted={retweeted}
            onRetweet={onRetweet}
            onRemoveRetweet={onRemoveRetweet}
            likeCount={likeCount}
            liked={liked}
            onLike={onLike}
            onUnlike={onUnlike}
            loggedIn={loggedIn}
          />
        </div>
      </article>
    </TweetLink>
  );
}

ReplyToReply.defaultProps = Tweet.defaultProps;

ReplyToReply.propTypes = Tweet.propTypes;
