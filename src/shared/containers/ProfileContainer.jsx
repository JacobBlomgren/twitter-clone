import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import Profile from '../components/Profile/Profile';
import { fetchUser } from '../actions/profile';
import { follow, unfollow } from '../actions/follow';

/* eslint-disable react/prop-types */
class ProfileContainer extends Component {
  componentDidMount() {
    // elapsed time since last fetch in minutes
    const time = (Date.now() - this.props.recievedAt) / (60 * 60);
    if (time > 30 || !this.props.id) this.props.fetchUser();
  }

  render() {
    if (!this.props.id) return <div>loading...</div>;
    return <Profile {...this.props} />;
  }
}
/* eslint-enable react/prop-types */

const findUser = (users, username) =>
  R.find(R.propEq('username', username), users);

function mapStateToProps(state, { username }) {
  const user = findUser(R.values(state.entities.users.byID), username);
  return { ...user, loggedInUserID: state.entities.loggedInUserID } || {};
}

function mapDispatchToProps(dispatch, { username }) {
  return {
    fetchUser: () => dispatch(fetchUser(username)),
    followUser: id => dispatch(follow(id)),
    unfollowUser: id => dispatch(unfollow(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
