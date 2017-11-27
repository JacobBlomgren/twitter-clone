import React from 'react';
import PropTypes from 'prop-types';

import TweetInfo from './TweetInfo';
import TweetContent from './TweetContent';
import TweetActions from './TweetActions';
import ReplyTo from './ReplyTo';
import Retweet from './Retweet';
import TweetProfilePicture from './TweetProfilePicture';
import TweetLink from './TweetLink';

export default function Tweet({
  id,
  name,
  username,
  profilePictureURL,
  createdAt,
  content,
  loggedIn,
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
    <TweetLink id={id}>
      <article
        className={`Tweet SmallPadding ${
          retweet ? 'NoUpperPadding' : ''
        } clearfix`}
      >
        {retweet ? <Retweet {...retweet} /> : ''}
        <div className="float-left">
          <div className="TweetProfilePicture__Column">
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

Tweet.defaultProps = {
  replyTo: '',
  retweet: null,
};

Tweet.propTypes = {
  id: PropTypes.string.isRequired,
  ...TweetInfo.propTypes,
  ...TweetContent.propTypes,
  replyTo: PropTypes.string,
  retweet: PropTypes.shape(Retweet.propTypes),
  ...TweetActions.propTypes,
};
