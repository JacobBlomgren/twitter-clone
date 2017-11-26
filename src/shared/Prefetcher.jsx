import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lazy from './components/ComposeTweet/Lazy';

/**
 * A component that prefetches code splitted parts of the App based on state.
 */
class Prefetcher extends Component {
  componentDidMount() {
    if (this.props.loggedIn) setTimeout(Lazy.preload, 2000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn)
      setTimeout(Lazy.preload, 3000);
  }

  render() {
    return null;
  }
}

Prefetcher.propTypes = { loggedIn: PropTypes.bool.isRequired };

export default connect(state => ({
  loggedIn: typeof state.entities.login.user !== 'undefined',
}))(Prefetcher);
