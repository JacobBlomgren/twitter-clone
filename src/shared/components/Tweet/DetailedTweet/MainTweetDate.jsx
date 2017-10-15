import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function MainTweetDate({ createdAt }) {
  return (
    <time className="MainTweet__Date LightText" dateTime={createdAt}>
      {moment(createdAt).format('hh:mm A MMM D YYYY')}
    </time>
  );
}

MainTweetDate.propTypes = {
  createdAt: PropTypes.string.isRequired,
};
