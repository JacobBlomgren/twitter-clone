import React from 'react';
import PropTypes from 'prop-types';

import TweetContainer from '../../../containers/TweetContainer';
import MainTweet from './MainTweet';
import ReplyList from './ReplyList';
import Reply from './Reply';

export default function DetailedTweet({ id, replies }) {
  return (
    <main className="MainColumn">
      <article>
        <TweetContainer Tweet={MainTweet} id={id} />
        <ReplyList replies={replies} />
      </article>
    </main>
  );
}

DetailedTweet.defaultProps = {
  replies: [],
};

DetailedTweet.propTypes = {
  id: PropTypes.string.isRequired,
  // parents: PropTypes.arrayOf(PropTypes.string).isRequired,
  replies: PropTypes.arrayOf(PropTypes.shape(Reply.propTypes)),
};
