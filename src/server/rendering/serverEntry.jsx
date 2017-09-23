import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import App from '../../../lib/shared/App';

const index = fs.readFileSync('./dist/index.html', 'utf8');

export default function renderApp(location, store, routerContext = {}) {
  const appHTML = renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const html = `<div id="root">${appHTML}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
    </script>`;

  return index.replace('INJECT', html);
}
