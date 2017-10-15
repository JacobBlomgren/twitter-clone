import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function MainTweetDate({ createdAt }) {
  return <p className="MainTweet__Date LightText">{moment(createdAt).format('hh:mm A MMM D YYYY')}</p>;
}

MainTweetDate.propTypes = {
  createdAt: PropTypes.string.isRequired,
};
