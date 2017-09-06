import { connect } from 'react-redux';

import TweetList from '../components/TweetList';

function mapStateToProps(state, { tweetIDs }) {
  const tweets = tweetIDs.map(id => {
    const tweet = state.entities.tweets.byID[id];
    const user = state.entities.users.byID[tweet.userID];
    return {
      name: user.name,
      username: user.username,
      ...tweet,
    };
  });
  return { tweets };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);
