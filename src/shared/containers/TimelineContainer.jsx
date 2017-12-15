import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../components/Spinner';
import Timeline from '../components/Timeline/Timeline';
import { fetchTimeline } from '../actions/timeline';
import TweetList from '../components/Tweet/TweetList';

class TimelineContainer extends Component {
  static isStale(recievedAt) {
    // elapsed time since last fetch in minutes
    return (Date.now() - recievedAt) / (1000 * 60) > 30;
  }

  componentDidMount() {
    if (
      !this.props.fetching &&
      TimelineContainer.isStale(this.props.recievedAt)
    ) {
      this.props.fetchTimeline();
    }
  }

  render() {
    const { tweetIDs, recievedAt } = this.props;
    if (!recievedAt) return <Spinner fullPage />;
    return <TweetList tweets={tweetIDs.map(id => ({ id }))} />;
  }
}

TimelineContainer.propTypes = {
  tweetIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  recievedAt: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchTimeline: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    tweetIDs: state.entities.tweets.timeline,
    recievedAt: state.network.timeline.recievedAt,
    fetching: state.network.timeline.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return { fetchTimeline: () => dispatch(fetchTimeline()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
