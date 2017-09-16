import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from './ProfilePicture';
import ProfileFollowingInfo from './ProfileFollowingInfo';

export default function ProfileHeader({
  name,
  username,
  profilePictureURL,
  description,
  followingCount,
  followerCount,
}) {
  return (
    <header className="ProfilePage__Header SmallPadding--Sides">
      <div className="ProfilePage__Header__ProfilePicture">
        <ProfilePicture url={profilePictureURL} username={username} />
      </div>
      <div className="ProfilePage__Header__Names">
        <h1 className="ProfilePage__Header__Name">{name}</h1>
        <span className="LightText">@{username}</span>
      </div>
      <div className="ProfilePage__Header__Description">{description}</div>
      <ProfileFollowingInfo
        followingCount={followingCount}
        followerCount={followerCount}
      />
    </header>
  );
}

ProfileHeader.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
};
