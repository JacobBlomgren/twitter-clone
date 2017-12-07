import React from 'react';
import Menu from 'react-burger-menu/lib/menus/push';
import PropTypes from 'prop-types';
import ProfilePicture from '../../Profile/ProfilePicture';
import ProfileFollowingInfo from '../../Profile/ProfileFollowingInfo';

export default function NavMenu({
  open,
  name,
  username,
  profilePictureURL,
  followerCount,
  followingCount,
  ...props
}) {
  return (
    <Menu
      customBurgerIcon={false}
      customCrossIcon={false}
      isOpen={open}
      {...props}
      noOverlay
      // width="200"
    >
      <div className="NavMenu">
        {username &&
          profilePictureURL && (
            <ProfilePicture
              url={profilePictureURL}
              username={username}
              className="NavMenuProfilePicture"
            />
          )}
        <div className="NavMenu__ProfileInfo">
          <ProfileFollowingInfo
            followingCount={followingCount}
            followerCount={followerCount}
          />
        </div>
      </div>
    </Menu>
  );
}

NavMenu.defaultProps = {
  name: null,
  username: null,
  profilePictureURL: null,
  followerCount: 0,
  followingCount: 0,
}

NavMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  name: PropTypes.string,
  username: PropTypes.string,
  profilePictureURL: PropTypes.string,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
};
