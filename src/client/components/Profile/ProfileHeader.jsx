import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from './ProfilePicture';
import ProfileFollowingInfo from './ProfileFollowingInfo';
import FollowButton from './FollowButton';

export default function ProfileHeader({
  id,
  name,
  username,
  profilePictureURL,
  description,
  followUser,
  follows,
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
      <FollowButton id={id} followUser={followUser} follows={follows} />
      <div className="ProfilePage__Header__Description">{description}</div>
      <ProfileFollowingInfo
        followingCount={followingCount}
        followerCount={followerCount}
      />
    </header>
  );
}

ProfileHeader.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  follows: PropTypes.bool.isRequired,
  followUser: PropTypes.func.isRequired,
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
};
