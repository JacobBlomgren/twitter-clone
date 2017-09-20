import React from 'react';
import PropTypes from 'prop-types';

export default function FollowButton({ id, followUser, follows }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => followUser(id)}
    >
      Follow
    </button>
  );
}

FollowButton.propTypes = {
  id: PropTypes.string.isRequired,
  followUser: PropTypes.func.isRequired,
  follows: PropTypes.bool.isRequired,
};
