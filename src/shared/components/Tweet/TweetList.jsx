import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Tweet from './Tweet';
import TweetContainer from '../../containers/TweetContainer';

export default class TweetList extends PureComponent {
  render() {
    const { tweets } = this.props;
    return (
      <ol className="TweetList">
        {tweets.map(({ id, retweet }) => (
          <li key={id} className="ListSkin">
            <TweetContainer Tweet={Tweet} id={id} retweet={retweet} />
          </li>
        ))}
      </ol>
    );
  }
}

TweetList.propTypes = {
  tweets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      retweet: PropTypes.string,
    }),
  ).isRequired,
};
