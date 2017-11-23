import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TweetPage from './components/page/TweetPage';
import ProfilePage from './components/page/ProfilePage';
import ErrorsContainer from './containers/ErrorsContainer';
import Lazy from './components/ComposeTweet/Lazy';

class App extends Component {
  componentDidMount() {
    if (this.props.loggedIn) setTimeout(Lazy.preload, 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn)
      setTimeout(Lazy.preload, 3000);
  }

  render() {
    return (
      <div>
        <Route path="/u/:username" component={ProfilePage} />
        <Route path="/t/:id" component={TweetPage} />
        <ErrorsContainer />
      </div>
    );
  }
}

App.propTypes = { loggedIn: PropTypes.bool.isRequired };

export default connect(state => ({
  loggedIn: typeof state.loggedInUserID !== 'undefined',
}))(App);
