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
        <span className="Tweet__Action__Button__Icon">{icon}</span>
        <span aria-hidden="true">{formatNumber(count)}</span>
      </button>
    </div>
  );
}

TweetAction.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  icon: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
