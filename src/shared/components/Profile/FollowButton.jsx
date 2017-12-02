import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function FollowButton({
  id,
  username,
  followUser,
  unfollowUser,
  follows,
  loggedIn,
  history,
}) {
  // Redirect to login if not logged in, and then back to this page afterwards.
  const redirect = () => history.push('/login', { from: `/u/${username}` });
  if (!follows) {
    const onClick = loggedIn ? () => followUser(id) : redirect;
    return (
      <button
        type="button"
        className="btn btn-outline-primary ProfilePage__Header__Button"
        onClick={onClick}
      >
        Follow
      </button>
    );
  }
  const onClick = loggedIn ? () => unfollowUser(id) : redirect;
  return (
    <button
      type="button"
      className="btn btn-primary btn-primary ProfilePage__Header__Button"
      onClick={onClick}
    >
      Unfollow
    </button>
  );
}

FollowButton.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  follows: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(FollowButton);
