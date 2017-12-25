import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function Username({ username }) {
  return (
    <span className="LightText Tweet__Info__Username">
      <span className="sr-only">Username: </span>
      <span aria-hidden="true">@</span>
      {username}
    </span>
  );
}

Username.propTypes = {
  username: PropTypes.string.isRequired,
};

export function Name({ name, username }) {
  return (
    <Link
      to={`/u/${username}`}
      className="Tweet__Info__Name"
      onClick={e => e.stopPropagation()}
    >
      {name}
    </Link>
  );
}

Name.propTypes = {
  ...Username.propTypes,
  name: PropTypes.string.isRequired,
};

moment.defineLocale('en-abbr', {
  parentLocale: 'en',
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '2s',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
});

class Time extends PureComponent {
  render() {
    const { createdAt } = this.props;
    const m = moment(createdAt).locale('en');
    if (m.isBefore(moment().subtract(1, 'months'))) return m.format('MMM D');
    return (
      <small className="LightText" aria-hidden="true">
        <span className="d-none d-sm-inline">{m.fromNow()}</span>
        <span className="d-sm-none">{m.locale('en-abbr').fromNow()}</span>
      </small>
    );
  }
}

Time.propTypes = { createdAt: PropTypes.string.isRequired };

export default function TweetInfo({ name, username, createdAt }) {
  return (
    <div className="Tweet__Info">
      <Name name={name} username={username} />
      <Username username={username} />
      <time dateTime={createdAt}>
        <span className="sr-only">
          Tweet created {moment(createdAt).fromNow()}.
        </span>
        <Time createdAt={createdAt} />
      </time>
    </div>
  );
}

TweetInfo.propTypes = {
  ...Username.propTypes,
  ...Name.propTypes,
  createdAt: PropTypes.string.isRequired,
};
