import React from 'react';
import PropTypes from 'prop-types';

import TweetAction from './TweetAction';

import reply from '../../../../public/icons/reply.png';
import retweet from '../../../../public/icons/retweet.png';
import like from '../../../../public/icons/like.png';
import likeActive from '../../../../public/icons/like-active.png';

function Like({ likeCount, liked, onLike, onUnlike }) {
  if (liked) {
    return (
      <TweetAction
        label="Unlike"
        active
        icon={likeActive}
        count={likeCount}
        onClick={onUnlike}
      />
    );
  }
  return (
    <TweetAction
      label="Like"
      active={false}
      icon={like}
      count={likeCount}
      onClick={onLike}
    />
  );
}

Like.propTypes = {
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

export default function TweetActions({
  replyCount,
  retweetCount,
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
      <TweetAction
        label="Retweet"
        active={false}
        icon={retweet}
        count={retweetCount}
        onClick={() => null}
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
  retweetCount: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};
