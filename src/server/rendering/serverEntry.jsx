import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from '../../../lib/shared/App';

const index = fs.readFileSync('./dist/index.html', 'utf8');
const stats = JSON.parse(fs.readFileSync('./dist/react-loadable.json', 'utf8'));

function inject(head, body, codeSplit) {
  return index
    .replace('INJECT_HEAD', head)
    .replace('INJECT_BODY', body)
    .replace('INJECT_CODE_SPLIT', codeSplit);
}

export default function renderApp(location, store, routerContext = {}) {
  const modules = [];
  const appHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <App />
        </Loadable.Capture>
      </StaticRouter>
    </Provider>,
  );
  const serializedState = JSON.stringify(store.getState());
  const body = `<div id="root">${appHTML}</div><script>window.__PRELOADED_STATE__ = ${serializedState}</script>`;

  // include all code-splitted bundled that were part of the render
  const bundles = getBundles(stats, modules);
  const codeSplit = bundles.map(
    bundle => `<script src="/static/${bundle.file}"></script>`,
  );

  const { title, meta } = Helmet.renderStatic();
  const head = `${title.toString()}${meta.toString()}`;

  return inject(head, body, codeSplit);
}
