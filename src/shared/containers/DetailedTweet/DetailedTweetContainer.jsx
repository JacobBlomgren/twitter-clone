import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import mapStateToProps from './mapStateToProps';
import { fetchTweet } from '../../actions/tweetDetails';
import Spinner from '../../components/Spinner';
import DetailedTweet from '../../components/Tweet/DetailedTweet/DetailedTweet';
import NotFoundPage from '../../components/page/NotFoundPage';

class DetailedTweetContainer extends Component {
  static isStale(recievedAt) {
    // elapsed time since last fetch in minutes
    return (Date.now() - recievedAt) / (1000 * 60) > 30;
  }

  static shouldFetchNotFound(notFound) {
    return notFound && (Date.now() - notFound.time) / (60 * 60) > 2;
  }

  componentDidMount() {
    if (
      DetailedTweetContainer.isStale(this.props.recievedAt) ||
      this.props.shouldFetch ||
      DetailedTweetContainer.shouldFetchNotFound(this.props.notFound)
    ) {
      this.props.fetchTweet();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      if (
        DetailedTweetContainer.isStale(nextProps.recievedAt) ||
        nextProps.shouldFetch
      ) {
        nextProps.fetchTweet();
      }
    }
  }

  render() {
    if (this.props.notFound) return <NotFoundPage message="Tweet not found" />;
    // If we do not even have partial data, show a full page spinner.
    if (this.props.shouldFetch && !this.props.partial)
      return <Spinner fullPage />;
    return (
      <div>
        <DetailedTweet {...this.props} />
        {this.props.shouldFetch && <Spinner fullPage={false} />}
      </div>
    );
  }
}

DetailedTweetContainer.defaultProps = {
  recievedAt: 0,
  id: -1,
  partial: false,
  notFound: null,
  shouldFetch: false,
};

DetailedTweetContainer.propTypes = {
  recievedAt: PropTypes.number,
  shouldFetch: PropTypes.bool,
  notFound: PropTypes.shape({
    time: PropTypes.number,
  }),
  partial: PropTypes.bool,
  id: PropTypes.string,
  fetchTweet: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch, { id }) {
  return { fetchTweet: () => dispatch(fetchTweet(id)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  DetailedTweetContainer,
);
