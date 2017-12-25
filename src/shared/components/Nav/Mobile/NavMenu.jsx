import React from 'react';
import Menu from 'react-burger-menu/lib/menus/push';
import PropTypes from 'prop-types';
import User from 'react-icons/lib/fa/user';
import Home from 'react-icons/lib/fa/home';
import { Link } from 'react-router-dom';

import ProfilePicture from '../../Profile/ProfilePicture';
import ProfileFollowingInfo from '../../Profile/ProfileFollowingInfo';

function ProfileInfo({
  username,
  profilePictureURL,
  followerCount,
  followingCount,
  onClick,
}) {
  return (
    <div className="NavMenu__ProfileInfo">
      {username &&
        profilePictureURL && (
          <div>
            <ProfilePicture
              url={profilePictureURL}
              username={username}
              className="NavMenuProfilePicture"
            />
            <p className="NavMenu__Username">
              <Link
                className="NavMenu__Username__Link link-no-style"
                to={`/u/${username}`}
                onClick={onClick}
              >
                <User size="18px" />
                @{username}
              </Link>
            </p>
          </div>
        )}
      <ProfileFollowingInfo
        followingCount={followingCount}
        followerCount={followerCount}
      />
    </div>
  );
}

ProfileInfo.defaultProps = {
  username: null,
  profilePictureURL: null,
  followerCount: 0,
  followingCount: 0,
};

ProfileInfo.propTypes = {
  username: PropTypes.string,
  profilePictureURL: PropTypes.string,
  followerCount: PropTypes.number,
  followingCount: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

function MenuList({ onClick }) {
  return (
    <ul className="NavMenu__List">
      <li>
        <Home size="22px" />
        <Link to="/" className="link-no-style" onClick={onClick}>
          Home
        </Link>
      </li>
    </ul>
  );
}

MenuList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default function NavMenu({
  open,
  name,
  username,
  profilePictureURL,
  followerCount,
  followingCount,
  onClick,
  ...props
}) {
  return (
    <Menu
      customBurgerIcon={false}
      customCrossIcon={false}
      isOpen={open}
      {...props}
      disableOverlayClick={onClick}
      // width="200"
    >
      <ProfileInfo
        onClick={onClick}
        username={username}
        profilePictureURL={profilePictureURL}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      <MenuList onClick={onClick} />
    </Menu>
  );
}

NavMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  ...ProfileInfo.propTypes,
};
