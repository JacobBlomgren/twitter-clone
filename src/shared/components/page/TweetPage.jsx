import React from 'react';
import PropTypes from 'prop-types';
import DetailedTweetContainer from '../../containers/DetailedTweet/DetailedTweetContainer';

export default function TweetPage({ match }) {
  return <DetailedTweetContainer id={match.params.id} />;
}

TweetPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};
