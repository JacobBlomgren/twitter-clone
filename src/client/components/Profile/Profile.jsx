import React from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from './ProfileHeader';
import TweetList from '../TweetList';

export default function Profile({
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
  tweets: PropTypes.arrayOf(PropTypes.string).isRequired,
};
