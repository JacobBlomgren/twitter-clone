import React from 'react';
import PropTypes from 'prop-types';

import formatNumber from '../formatNumber';

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

export default function ProfileFollowingInfo({ following, followers }) {
  return (
    <div className="ProfilePage__Header__Followings">
      <FollowingInfo number={following} text={'Following'} />
      <FollowingInfo number={followers} text={'Followers'} />
    </div>
  );
}

ProfileFollowingInfo.propTypes = {
  following: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
};
