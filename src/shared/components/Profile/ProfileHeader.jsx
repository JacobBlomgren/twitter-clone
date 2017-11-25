import React from 'react';
import PropTypes from 'prop-types';

import ProfilePicture from './ProfilePicture';
import ProfileFollowingInfo from './ProfileFollowingInfo';
import FollowButton from './FollowButton';

export default function ProfileHeader({
  id,
  loggedInUserID,
  name,
  username,
  profilePictureURL,
  description,
  followUser,
  unfollowUser,
  follows,
  followingCount,
  followerCount,
}) {
  return (
    <header className="ProfilePage__Header Header SmallPadding--Sides">
      <div className="container-fluid container-fluid--no-padding">
        <div className="row">
          <div className="ProfilePage__Header__ProfilePicture col-md-3">
            <ProfilePicture url={profilePictureURL} username={username} />
          </div>
          <section className="ProfilePage__Header__Text col-md-9">
            <div className="ProfilePage__Header__Heading clearfix">
              {loggedInUserID !== id && (
                <FollowButton
                  id={id}
                  followUser={followUser}
                  unfollowUser={unfollowUser}
                  follows={follows}
                />
              )}
              <div className="ProfilePage__Header__Names">
                <h1 className="ProfilePage__Header__Name">{name}</h1>
                <span className="LightText">@{username}</span>
              </div>
            </div>
            <p className="ProfilePage__Header__Description">{description}</p>
            <ProfileFollowingInfo
              followingCount={followingCount}
              followerCount={followerCount}
            />
          </section>
        </div>
      </div>
    </header>
  );
}

ProfileHeader.defaultProps = {
  description: '',
  loggedInUserID: null,
};

ProfileHeader.propTypes = {
  id: PropTypes.string.isRequired,
  loggedInUserID: PropTypes.string,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string.isRequired,
  description: PropTypes.string,
  ...FollowButton.propTypes,
  ...ProfileFollowingInfo.propTypes,
};
