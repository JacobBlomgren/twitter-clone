import React from 'react';
import PropTypes from 'prop-types';

import formatNumber from '../../utils/formatNumber';

export default function TweetAction({
  label,
  active,
  icon,
  count,
  onClick,
  description: { singular, plural },
}) {
  return (
    <div className="Tweet__Action">
      <span className="sr-only">
        {`${count} ${count !== 1 ? plural : singular}`}
      </span>
      <button
        className={`Tweet__Action__Button ${
          active ? 'Tweet__Action__Button--Active' : 'LightText'
        }`}
        aria-label={label}
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div aria-hidden="true">
          <span className="Tweet__Action__Button__Icon">{icon}</span>
          <span>{formatNumber(count)}</span>
        </div>
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
  description: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }).isRequired,
};
