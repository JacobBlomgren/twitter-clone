import React from 'react';
import PropTypes from 'prop-types';

import TweetContainer from '../../../containers/TweetContainer';
import Tweet from '../Tweet';
import ReplyToReply from './ReplyToReply';

export default function Reply({ id, replies }) {
  console.log(replies);
  return (
    <div>
      <TweetContainer Tweet={Tweet} id={id} />
      <ol className="TweetList">
        {replies.map(({ id: replyID }) => (
          <li key={replyID}>
            <TweetContainer Tweet={ReplyToReply} id={replyID} />
          </li>
        ))}
      </ol>
    </div>
  );
}

Reply.defaultProps = {
  replies: [],
};

Reply.propTypes = {
  id: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(PropTypes.shape(Reply.propTypes)),
};
