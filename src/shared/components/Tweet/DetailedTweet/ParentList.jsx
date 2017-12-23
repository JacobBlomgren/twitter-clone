import React from 'react';
import PropTypes from 'prop-types';

import TweetContainer from '../../../containers/TweetContainer';
import Parent from './Parent';

export default function ParentList({ parents }) {
  return (
    <ol className="TweetList ParentList">
      {parents.map(id => (
        <li key={id} className="ListSkin">
          <TweetContainer Tweet={Parent} id={id} />
        </li>
      ))}
    </ol>
  );
}

ParentList.propTypes = {
  parents: PropTypes.arrayOf(PropTypes.string).isRequired,
};
