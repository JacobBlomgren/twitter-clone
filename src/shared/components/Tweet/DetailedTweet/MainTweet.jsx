import React, { Component } from 'react';
import { scroller, Element } from 'react-scroll';

import Tweet from '../Tweet';
import TweetProfilePicture from '../TweetProfilePicture';
import TweetContent from '../TweetContent';
import TweetActions from '../TweetActions';
import MainTweetInfo from './MainTweetInfo';
import MainTweetDate from './MainTweetDate';
import ReplyTo from '../ReplyTo';

function MainTweet({
  id,
  name,
  username,
  profilePictureURL,
  createdAt,
  content,
  loggedIn,
  replyTo,
  replyCount,
  retweetCount,
  retweeted,
  onRetweet,
  onRemoveRetweet,
  likeCount,
  liked,
  onLike,
  onUnlike,
}) {
  return (
    <div className="Tweet SmallPadding Header">
      <div className="MainTweet__Header clearfix">
        <div className="float-left">
          <div className="TweetProfilePicture__Column TweetProfilePicture__Column--Main">
            <TweetProfilePicture url={profilePictureURL} username={username} />
          </div>
        </div>
        <div className="float-left">
          <MainTweetInfo name={name} username={username} />
        </div>
      </div>
      <div>
        {replyTo ? <ReplyTo username={replyTo} /> : ''}
        <TweetContent content={content} />
        <MainTweetDate createdAt={createdAt} />
        <TweetActions
          id={id}
          replyCount={replyCount}
          retweetCount={retweetCount}
          retweeted={retweeted}
          onRetweet={onRetweet}
          onRemoveRetweet={onRemoveRetweet}
          likeCount={likeCount}
          liked={liked}
          onLike={onLike}
          onUnlike={onUnlike}
          loggedIn={loggedIn}
        />
      </div>
    </div>
  );
}

MainTweet.defaultProps = Tweet.defaultProps;

MainTweet.propTypes = Tweet.propTypes;

/**
 * A wrapping component that scrolls the window to the MainTweet upon mounting.
 */
export default class ScrollWrapper extends Component {
  componentDidMount() {
    if (window) {
      // Check if the device is (probably) a mobile phone or not,
      // since the nav height differs for mobile and larger devices.
      const mobile =
        window.screen.height > window.screen.width && window.innerWidth < 768;
      scroller.scrollTo('main-tweet', {
        duration: 0,
        offset: mobile ? -3 * 16 : -2.5 * 16,
      });
    }
  }

  render() {
    return (
      <Element name="main-tweet">
        <MainTweet {...this.props} />
      </Element>
    );
  }
}
