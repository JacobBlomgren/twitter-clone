import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import DetailedTweetContainer from '../../containers/DetailedTweet/DetailedTweetContainer';

function TweetPage({ id, content, name }) {
  const title = content ? `${name} tweeted: ${content}` : `Tweet ${id}`;
  return (
    <div>
      <Helmet title={title} />
      <DetailedTweetContainer id={id} />
    </div>
  );
}

TweetPage.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  name: PropTypes.string,
};

TweetPage.defaultProps = {
  content: null,
  name: null,
};

function mapStateToProps(state, ownProps) {
  const { match: { params: { id } } } = ownProps;
  const tweet = state.entities.tweets.byID[id];
  const name = tweet && state.entities.users.byID[tweet.userID].name;
  return {
    id,
    content: tweet && tweet.content,
    name,
  };
}

export default connect(mapStateToProps)(TweetPage);
