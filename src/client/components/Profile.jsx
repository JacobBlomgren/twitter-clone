import React from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from './ProfileHeader';
import TweetListContainer from '../containers/TweetListContainer';

export default function Profile({
  userID,
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
        <TweetListContainer tweetIDs={tweets} />
      </main>
    </div>
  );
}

Profile.propTypes = {
  userID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profilePictureURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  following: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  tweetIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
};
