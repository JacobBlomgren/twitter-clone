import React from 'react';
import PropTypes from 'prop-types';

import TweetAction from './TweetAction';

import reply from '../../../../public/icons/reply.png';
import retweet from '../../../../public/icons/retweet.png';
import retweetActive from '../../../../public/icons/retweet-active.png';
import like from '../../../../public/icons/like.png';
import likeActive from '../../../../public/icons/like-active.png';

function Like({ likeCount, liked, onLike, onUnlike }) {
  return (
    <TweetAction
      label={liked ? 'Unlike' : 'Like'}
      active={liked}
      icon={liked ? likeActive : like}
      count={likeCount}
      onClick={liked ? onUnlike : onLike}
    />
  );
}

Like.propTypes = {
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

function Retweet({ retweetCount, retweeted, onRetweet, onRemoveRetweet }) {
  return (
    <TweetAction
      label={retweeted ? 'Remove retweet' : 'Retweet'}
      active={retweeted}
      icon={retweeted ? retweetActive : retweet}
      count={retweetCount}
      onClick={retweeted ? onRemoveRetweet : onRetweet}
    />
  );
}

Retweet.propTypes = {
  retweetCount: PropTypes.number.isRequired,
  retweeted: PropTypes.bool.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onRemoveRetweet: PropTypes.func.isRequired,
};

export default function TweetActions({
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
    <div>
      <TweetAction
        label="Reply"
        active={false}
        icon={reply}
        count={replyCount}
        onClick={() => null}
      />
      <Retweet
        retweetCount={retweetCount}
        retweeted={retweeted}
        onRetweet={onRetweet}
        onRemoveRetweet={onRemoveRetweet}
      />
      <Like
        likeCount={likeCount}
        liked={liked}
        onLike={onLike}
        onUnlike={onUnlike}
      />
    </div>
  );
}

TweetActions.propTypes = {
  replyCount: PropTypes.number.isRequired,
  ...Retweet.propTypes,
  ...Like.propTypes,
};
