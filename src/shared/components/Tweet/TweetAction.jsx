import React from 'react';
import PropTypes from 'prop-types';

import formatNumber from '../../utils/formatNumber';

export default function TweetAction({ label, active, icon, count, onClick }) {
  return (
    <div className="Tweet__Action">
      <button
        className={`Tweet__Action__Button ${
          active ? 'Tweet__Action__Button--Active' : 'LightText'
        }`}
        aria-label={label}
        onClick={onClick}
      >
        <img src={icon} alt="" className="Tweet__Action__Button__Icon" />
        <span aria-hidden="true">{formatNumber(count)}</span>
      </button>
    </div>
  );
}

TweetAction.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
