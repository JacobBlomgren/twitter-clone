import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import insertHashtags from './insertHashtags';
import insertMentions from './insertMentions';

export default class TweetContent extends PureComponent {
  render() {
    const { content } = this.props;
    /* Insert hashtags which creates a list of Hashtag components and simple strings.
    Then apply insertMentions only to the string elements of the list. The string part of content is now
    split up, hence map must be used.
    Not the most elegant solution, it would be much easier if we were dealing with a simple html string,
    where String's replace could be used, e.g. content.replace(hashtagRegex, h => `<span>${h}</span>`).
    */
    const contentWithHashtags = insertHashtags(content);
    const contentWithHashtagsAndMentions = contentWithHashtags.map(
      elem => (typeof elem === 'string' ? insertMentions(elem) : elem),
    );
    return <p className="Tweet__Content">{contentWithHashtagsAndMentions}</p>;
  }
}

TweetContent.propTypes = {
  content: PropTypes.string.isRequired,
};
