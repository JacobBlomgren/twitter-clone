import React from 'react';
import PropTypes from 'prop-types';
import TweetContainer from '../../../containers/TweetContainer';
import MainTweet from './MainTweet';

export default function DetailedTweet({ id }) {
  return (
    <main className="MainColumn ListSkin">
      <article>
        <TweetContainer Tweet={MainTweet} id={id} />
      </article>
    </main>
  );
}

DetailedTweet.propTypes = {
  id: PropTypes.string.isRequired,
  // parents: PropTypes.arrayOf(PropTypes.string).isRequired,
  // children: PropTypes.arrayOf(PropTypes.string).isRequired,
};
