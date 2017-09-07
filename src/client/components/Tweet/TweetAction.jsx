import React from 'react';
import PropTypes from 'prop-types';

import formatNumber from '../../formatNumber';

export default function TweetAction({ label, icon, count, onClick }) {
  return (
    <div className="Tweet__Action">
      <button
        className="Tweet__Action__Button LightText"
        aria-label={label}
        onClick={onClick}
      >
        <img src={icon} alt="" className="Tweet__Action__Button__Icon" />
        <span aria-hidden>{formatNumber(count)}</span>
      </button>
    </div>
  );
}

TweetAction.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
