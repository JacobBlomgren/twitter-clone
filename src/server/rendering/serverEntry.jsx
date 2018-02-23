import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import App from '../../../lib/shared/App';

const index = fs.readFileSync('./dist/index.html', 'utf8');

function inject(head, body) {
  return index.replace('INJECT_HEAD', head).replace('INJECT_BODY', body);
}

export default function renderApp(location, store, routerContext = {}) {
  const appHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  const serializedState = JSON.stringify(store.getState());
  const body = `<div id="root">${appHTML}</div>
    <script>window.__PRELOADED_STATE__ = ${serializedState}</script>`;

  const { title, meta } = Helmet.renderStatic();

  return inject(`${title.toString()}${meta.toString()}`, body);
}
