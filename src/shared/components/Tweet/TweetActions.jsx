import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';

import TweetAction from './TweetAction';

import reply from '../../../../public/icons/reply.png';
import retweet from '../../../../public/icons/retweet.png';
import retweetActive from '../../../../public/icons/retweet-active.png';
import like from '../../../../public/icons/like.png';
import likeActive from '../../../../public/icons/like-active.png';

function Like({ likeCount, liked, loggedIn, redirect, onLike, onUnlike }) {
  let onClick;
  if (loggedIn) onClick = liked ? onUnlike : onLike;
  else onClick = redirect;
  return (
    <TweetAction
      label={liked ? 'Unlike' : 'Like'}
      active={liked}
      icon={liked ? likeActive : like}
      count={likeCount}
      onClick={onClick}
    />
  );
}

Like.propTypes = {
  likeCount: PropTypes.number.isRequired,
  liked: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  redirect: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
};

function Retweet({
  retweetCount,
  retweeted,
  loggedIn,
  redirect,
  onRetweet,
  onRemoveRetweet,
}) {
  let onClick;
  if (loggedIn) onClick = retweeted ? onRemoveRetweet : onRetweet;
  else onClick = redirect;
  return (
    <TweetAction
      label={retweeted ? 'Remove retweet' : 'Retweet'}
      active={retweeted}
      icon={retweeted ? retweetActive : retweet}
      count={retweetCount}
      onClick={onClick}
    />
  );
}

Retweet.propTypes = {
  retweetCount: PropTypes.number.isRequired,
  retweeted: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  redirect: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onRemoveRetweet: PropTypes.func.isRequired,
};

function TweetActions({
  id,
  history,
  replyCount,
  retweetCount,
  retweeted,
  onRetweet,
  onRemoveRetweet,
  likeCount,
  liked,
  onLike,
  onUnlike,
  loggedIn,
}) {
  const redirect = () => history.push('/login', { from: `/t/${id}` });
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
        loggedIn={loggedIn}
        redirect={redirect}
      />
      <Like
        likeCount={likeCount}
        liked={liked}
        onLike={onLike}
        onUnlike={onUnlike}
        loggedIn={loggedIn}
        redirect={redirect}
      />
    </div>
  );
}

TweetActions.propTypes = {
  id: PropTypes.string.isRequired,
  replyCount: PropTypes.number.isRequired,
  ...R.dissoc('redirect', Retweet.propTypes),
  ...R.dissoc('redirect', Like.propTypes),
};

export default withRouter(TweetActions);
