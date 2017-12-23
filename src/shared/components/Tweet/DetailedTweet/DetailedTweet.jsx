import React from 'react';
import PropTypes from 'prop-types';

import TweetContainer from '../../../containers/TweetContainer';
import MainTweet from './MainTweet';
import ReplyList from './ReplyList';
import Reply from './Reply';
import ParentList from './ParentList';

export default function DetailedTweet({ id, replies, parents }) {
  return (
    <main className="MainColumn">
      <article>
        <ParentList parents={parents} />
        <TweetContainer Tweet={MainTweet} id={id} />
        <ReplyList replies={replies} />
      </article>
    </main>
  );
}

DetailedTweet.defaultProps = {
  replies: [],
  parents: [],
};

DetailedTweet.propTypes = {
  id: PropTypes.string.isRequired,
  parents: PropTypes.arrayOf(PropTypes.string),
  replies: PropTypes.arrayOf(PropTypes.shape(Reply.propTypes)),
};
