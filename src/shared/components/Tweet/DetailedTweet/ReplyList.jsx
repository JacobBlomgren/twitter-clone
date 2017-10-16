import React from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';

export default function ReplyList({ replies }) {
  return (
    <ol className="TweetList">
      {replies.map(({ id, children: replyList }) => (
        <li key={id} className="ListSkin">
          <Reply id={id} replies={replyList} />
        </li>
      ))}
    </ol>
  );
}

ReplyList.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.shape(Reply.propTypes)).isRequired,
};
