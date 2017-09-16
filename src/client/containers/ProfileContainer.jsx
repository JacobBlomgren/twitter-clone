import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../components/Profile/Profile';
import { fetchUser } from '../actions/profile';

/* eslint-disable react/prop-types */
class ProfileContainer extends Component {
  componentDidMount() {
    // elapsed time since last fetch in minutes
    const time = (Date.now() - this.props.recievedAt) / (60 * 60);
    if (time > 30 || !this.props.id) this.props.fetchUser();
  }

  render() {
    if (this.props.isFetching || !this.props.id) return <div>loading...</div>;
    return <Profile {...this.props} />;
  }
}
/* eslint-enable react/prop-types */

function mapStateToProps(state, { userID }) {
  const user = state.entities.users.byID[userID];
  return { ...user };
}

function mapDispatchToProps(dispatch, { userID }) {
  return {
    fetchUser: () => dispatch(fetchUser(userID)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
