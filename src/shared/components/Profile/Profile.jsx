import React from 'react';

import ProfileHeader from './ProfileHeader';
import TweetList from '../Tweet/TweetList';

export default function Profile({
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
  tweets,
}) {
  return (
    <div className="MainColumn">
      <ProfileHeader
        id={id}
        loggedInUserID={loggedInUserID}
        name={name}
        username={username}
        profilePictureURL={profilePictureURL}
        description={description}
        followUser={followUser}
        unfollowUser={unfollowUser}
        follows={follows}
        followingCount={followingCount}
        followerCount={followerCount}
      />
      <main>
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
}

Profile.propTypes = {
  ...ProfileHeader.propTypes,
  ...TweetList.propTypes,
};
