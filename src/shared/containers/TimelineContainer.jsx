import * as R from 'ramda';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../components/Spinners/Spinner';
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
  // following: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchTimeline: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // Join the tweet id list with the tweets.byID table to get createdAt to
  // sort by.
  const tweets = state.entities.tweets.timeline.map(id => ({
    id,
    createdAt: state.entities.tweets.byID[id].createdAt,
  }));
  const sorted = R.sortWith([R.descend(R.prop('createdAt'))], tweets);
  return {
    tweetIDs: R.pluck('id', sorted),
    recievedAt: state.network.timeline.recievedAt,
    fetching: state.network.timeline.fetching,
    // following: state.entities.users.following.allIDs,
  };
}

function mapDispatchToProps(dispatch) {
  return { fetchTimeline: () => dispatch(fetchTimeline()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer);
