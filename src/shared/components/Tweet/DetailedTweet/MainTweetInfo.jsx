import React from 'react';

import { Name, Username } from '../TweetInfo';

export default function MainTweetInfo({ name, username }) {
  return (
    <div className="Tweet__Info--Main">
      <Name name={name} username={username} />
      <div>
        <Username username={username} />
      </div>
    </div>
  );
}

MainTweetInfo.propTypes = {
  ...Username.propTypes,
  ...Name.propTypes,
};
