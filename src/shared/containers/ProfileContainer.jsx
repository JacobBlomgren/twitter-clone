import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import Profile from '../components/Profile/Profile';
import Spinner from '../components/Spinner';
import { fetchUser } from '../actions/profile';
import { follow, unfollow } from '../actions/follow';
import NotFoundPage from '../components/page/NotFoundPage';

/* eslint-disable react/prop-types */
/**
 * Component to wrap a profile, that fetches new data for the requested user
 * if the current data is old, non-existent, or partial.
 */
class ProfileContainer extends Component {
  static shouldFetch(recievedAt, id, partial) {
    // elapsed time since last fetch in minutes
    const time = (Date.now() - recievedAt) / (60 * 60);
    return time > 30 || !id || partial;
  }

  static shouldFetchNotFound(notFound) {
    return notFound && (Date.now() - notFound.time) / (60 * 60) > 5;
  }

  componentDidMount() {
    if (
      ProfileContainer.shouldFetch(
        this.props.recievedAt,
        this.props.id,
        this.props.partial,
      ) ||
      ProfileContainer.shouldFetchNotFound(this.props.notFound)
    ) {
      this.props.fetchUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      if (
        ProfileContainer.shouldFetch(
          nextProps.recievedAt,
          nextProps.id,
          nextProps.partial,
        ) ||
        ProfileContainer.shouldFetchNotFound(this.props.notFound)
      ) {
        nextProps.fetchUser();
      }
    }
  }

  render() {
    if (this.props.notFound) return <NotFoundPage message="User not found" />;
    if (!this.props.id || this.props.partial) return <Spinner fullPage />;
    return <Profile {...this.props} />;
  }
}
/* eslint-enable react/prop-types */

const findUser = (users, username) =>
  R.find(R.propEq('username', username), users);

function mapStateToProps(state, { username }) {
  const user = findUser(Object.values(state.entities.users.byID), username);
  if (!user) {
    if (state.entities.users.notFound[username])
      return { notFound: state.entities.users.notFound[username] };
    return {};
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
  return { ...user, tweets, loggedInUserID: state.entities.loggedInUserID };
}

function mapDispatchToProps(dispatch, { username }) {
  return {
    fetchUser: () => dispatch(fetchUser(username)),
    followUser: id => dispatch(follow(id)),
    unfollowUser: id => dispatch(unfollow(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
