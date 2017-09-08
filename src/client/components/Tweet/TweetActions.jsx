import React from 'react';
import PropTypes from 'prop-types';

import TweetAction from './TweetAction';

import reply from '../../../../public/icons/reply.png';
import retweet from '../../../../public/icons/retweet.png';
import like from '../../../../public/icons/like.png';
import likeActive from '../../../../public/icons/like-active.png';

function Like({ likes, liked, onLike }) {
  if (liked) {
    return (
      <TweetAction
        label="Unlike"
        active
        icon={likeActive}
        count={likes}
        onClick={null}
      />
    );
  }
  return (
    <TweetAction
      label="Like"
      active={false}
      icon={like}
      count={likes}
      onClick={onLike}
    />
  );
}

Like.propTypes = {
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default function TweetActions({
  replies,
  retweets,
  likes,
  liked,
  onLike,
}) {
  return (
    <div>
      <TweetAction
        label="Reply"
        active={false}
        icon={reply}
        count={replies}
        onClick={null}
      />
      <TweetAction
        label="Retweet"
        active={false}
        icon={retweet}
        count={retweets}
        onClick={null}
      />
      <Like likes={likes} liked={liked} onLike={onLike} />
    </div>
  );
}

TweetActions.propTypes = {
  replies: PropTypes.number.isRequired,
  retweets: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};
