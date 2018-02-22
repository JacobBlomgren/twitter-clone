import React from 'react';
import Helmet from 'react-helmet';
import TimelineContainer from '../../containers/TimelineContainer';

export default function TimelinePage() {
  return (
    <div>
      <Helmet title="Timeline" />
      <main className="MainColumn">
        <TimelineContainer />
      </main>
    </div>
  );
}
