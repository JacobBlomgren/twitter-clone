import React from 'react';
import PropTypes from 'prop-types';

import TweetAction from './TweetAction';

import reply from '../../../../public/icons/reply.png';
import retweet from '../../../../public/icons/retweet.png';
import like from '../../../../public/icons/like.png';

export default function TweetActions({ replies, retweets, likes }) {
  return (
    <div>
      <TweetAction label="Reply" icon={reply} count={replies} />
      <TweetAction label="Retweet" icon={retweet} count={retweets} />
      <TweetAction label="Like" icon={like} count={likes} />
    </div>
  );
}

TweetActions.propTypes = {
  replies: PropTypes.number.isRequired,
  retweets: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
};
