import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Profile from '../components/Profile/Profile';
import Spinner from '../components/Spinner';
import { fetchProfile } from '../actions/profile';
import { follow, unfollow } from '../actions/following';
import NotFoundPage from '../components/page/NotFoundPage';

/**
 * Component to wrap a profile, that fetches new data for the requested user
 * if the current data is old, non-existent, or partial.
 */
class ProfileContainer extends Component {
  static isStale(recievedAt) {
    // elapsed time since last fetch in minutes
    return (Date.now() - recievedAt) / (1000 * 60) > 30;
  }

  static shouldFetchNotFound(notFound) {
    return notFound && (Date.now() - notFound.time) / (1000 * 60) > 5;
  }

  componentDidMount() {
    if (
      !this.props.fetching &&
      (ProfileContainer.isStale(this.props.recievedAt) ||
        this.props.shouldFetch ||
        ProfileContainer.shouldFetchNotFound(this.props.notFound))
    ) {
      this.props.fetchProfile();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      if (
        !nextProps.fetching &&
        (ProfileContainer.isStale(nextProps.recievedAt) ||
          nextProps.shouldFetch ||
          ProfileContainer.shouldFetchNotFound(nextProps.notFound))
      ) {
        nextProps.fetchProfile();
      }
    }
  }

  render() {
    if (this.props.notFound) return <NotFoundPage message="User not found" />;
    if (this.props.shouldFetch) return <Spinner fullPage />;
    return <Profile {...this.props} />;
  }
}

ProfileContainer.propTypes = {
  id: PropTypes.string,
  recievedAt: PropTypes.number,
  shouldFetch: PropTypes.bool,
  notFound: PropTypes.bool,
  fetchProfile: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

ProfileContainer.defaultProps = {
  id: null,
  recievedAt: null,
  shouldFetch: false,
  notFound: false,
};

const findUser = (users, username) =>
  R.find(R.propEq('username', username), users);

function mapStateToProps(state, { username }) {
  const fetching = state.network.user.fetching.includes(username);
  const user = findUser(Object.values(state.entities.users.byID), username);
  // Determine whether there is enough data to display the profile.
  if (!user) {
    if (state.entities.users.notFound[username])
      return { notFound: state.entities.users.notFound[username], fetching };
    return { shouldFetch: true, fetching };
  }

  if (user.partial) {
    return {
      id: user.id,
      // can probably remove
      partial: true,
      shouldFetch: true,
      fetching,
    };
  }

  const tweetsWithTimestamp = user.tweets
    ? user.tweets.map(id => ({
        id,
        createdAt: state.entities.tweets.byID[id].createdAt,
        retweet: null,
      }))
    : [];
  const retweets = user.retweets
    ? user.retweets.map(t => ({ ...t, retweet: user.id }))
    : [];
  const tweets = R.compose(
    R.map(({ id, retweet }) => ({ id, retweet })),
    R.sortBy(R.prop('createdAt')),
    R.union,
  )(tweetsWithTimestamp, retweets);
  return {
    ...user,
    tweets,
    loggedInUserID: state.entities.login.user && state.entities.login.user.id,
    fetching,
  };
}

function mapDispatchToProps(dispatch, { username }) {
  return {
    fetchProfile: () => dispatch(fetchProfile(username)),
    followUser: id => dispatch(follow(id)),
    unfollowUser: id => dispatch(unfollow(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
