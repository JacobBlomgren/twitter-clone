import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

function formatNumber(num) {
  if (num < 1000) return num;
  if (num < 10000) return numeral(num).format('0.0a').toUpperCase();
  if (num < 1000000) return numeral(num).format('0a').toUpperCase();
  return numeral(num).format('0.0a').toUpperCase();
}

export default function TweetAction({ label, icon, count }) {
  return (
    <div className="Tweet__Action">
      <button className="Tweet__Action__Button" aria-label={label}>
        <img src={icon} alt="" className="Tweet__Action__Button__Icon" />
        <span aria-hidden>
          {formatNumber(count)}
        </span>
      </button>
    </div>
  );
}

TweetAction.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
