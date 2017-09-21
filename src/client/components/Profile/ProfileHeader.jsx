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
  follows,
  followingCount,
  followerCount,
}) {
  return (
    <header className="ProfilePage__Header">
      <div className="container-fluid container-fluid--no-padding SmallPadding--Sides">
        <div className="row">
          <div className="ProfilePage__Header__ProfilePicture col-md-3">
            <ProfilePicture url={profilePictureURL} username={username} />
          </div>
          <section className="ProfilePage__Header__Text col-md-9">
            <div className="ProfilePage__Header__Heading clearfix">
              {loggedInUserID !== id && (
                <FollowButton
                  id={id}
                  loggedInUserID={loggedInUserID}
                  followUser={followUser}
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

ProfileHeader.propTypes = {
  id: PropTypes.string.isRequired,
  loggedInUserID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  follows: PropTypes.bool.isRequired,
  followUser: PropTypes.func.isRequired,
  followingCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
};
