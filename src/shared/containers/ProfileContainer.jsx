import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import Profile from '../components/Profile/Profile';
import Spinner from '../components/Spinner';
import { fetchUser } from '../actions/profile';
import { follow, unfollow } from '../actions/follow';

/* eslint-disable react/prop-types */
class ProfileContainer extends Component {
  static shouldFetch(recievedAt, id, partial) {
    // elapsed time since last fetch in minutes
    const time = (Date.now() - recievedAt) / (60 * 60);
    return time > 30 || !id || partial;
  }

  componentDidMount() {
    if (
      ProfileContainer.shouldFetch(
        this.props.recievedAt,
        this.props.id,
        this.props.partial,
      )
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
        )
      ) {
        nextProps.fetchUser();
      }
    }
  }

  render() {
    if (!this.props.id || this.props.partial) return <Spinner fullPage />;
    return <Profile {...this.props} />;
  }
}
/* eslint-enable react/prop-types */

const findUser = (users, username) =>
  R.find(R.propEq('username', username), users);

function mapStateToProps(state, { username }) {
  const user = findUser(R.values(state.entities.users.byID), username);
  if (!user) return {};
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
