import React from 'react';
import PropTypes from 'prop-types';

import formatNumber from '../../utils/formatNumber';

function FollowingInfo({ number, text }) {
  return (
    <div className="FollowingInfo">
      <span className="FollowingInfo__Number">{formatNumber(number)}</span>{' '}
      <span className="LightText">{text}</span>
    </div>
  );
}

FollowingInfo.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

/**
 * The number of followers and users this user follows.
 */
export default function ProfileFollowingInfo({
  followingCount,
  followerCount,
}) {
  return (
    <div className="ProfilePage__Header__Followings">
      <FollowingInfo number={followingCount} text="Following" />
      <FollowingInfo
        number={followerCount}
        text={`${followerCount !== 1 ? 'Followers' : 'Follower'}`}
      />
    </div>
  );
}

ProfileFollowingInfo.propTypes = {
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
};
