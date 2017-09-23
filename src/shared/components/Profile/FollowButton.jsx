import React from 'react';
import PropTypes from 'prop-types';

export default function FollowButton({
  id,
  followUser,
  unfollowUser,
  follows,
}) {
  if (!follows) {
    return (
      <button
        type="button"
        className="btn btn-outline-primary ProfilePage__Header__Button"
        onClick={() => followUser(id)}
      >
        Follow
      </button>
    );
  }
  return (
    <button
      type="button"
      className="btn btn-primary btn-primary ProfilePage__Header__Button"
      onClick={() => unfollowUser(id)}
    >
      Unfollow
    </button>
  );
}

FollowButton.propTypes = {
  id: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  follows: PropTypes.bool.isRequired,
};
