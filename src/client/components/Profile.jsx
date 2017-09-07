import React from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from './ProfileHeader';
import TweetList from '../components/TweetList';

export default function Profile({
  name,
  username,
  profilePictureURL,
  description,
  following,
  followers,
  tweets,
}) {
  return (
    <div className="MainColumn">
      <ProfileHeader
        name={name}
        username={username}
        profilePictureURL={profilePictureURL}
        description={description}
        following={following}
        followers={followers}
      />
      <main>
        <TweetList tweets={tweets} />
      </main>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  following: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  tweets: PropTypes.arrayOf(PropTypes.string).isRequired,
};
