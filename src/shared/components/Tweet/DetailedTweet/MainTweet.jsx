import React from 'react';
import Tweet from '../Tweet';
import TweetProfilePicture from '../TweetProfilePicture';
import TweetContent from '../TweetContent';
import TweetActions from '../TweetActions';
import MainTweetInfo from './MainTweetInfo';
import MainTweetDate from './MainTweetDate';

export default function MainTweet({
  name,
  username,
  profilePictureURL,
  createdAt,
  content,
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
    <div className="Tweet SmallPadding Header">
      <div className="MainTweet__Header clearfix">
        <div className="float-left">
          <div className="TweetProfilePicture__Column TweetProfilePicture__Column--Main">
            <TweetProfilePicture url={profilePictureURL} username={username} />
          </div>
        </div>
        <div className="float-left">
          <MainTweetInfo name={name} username={username} />
        </div>
      </div>
      <div>
        <TweetContent content={content} />
        <MainTweetDate createdAt={createdAt} />
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

MainTweet.defaultProps = Tweet.defaultProps;

MainTweet.propTypes = Tweet.propTypes;
