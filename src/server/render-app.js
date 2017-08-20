import { APP_CONTAINER_ID, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/utils/isProd';

const styleSheet = isProd
  ? `<link rel="stylesheet" href="${STATIC_PATH}/styles/main.css">`
  : '';

function renderApp(title) {
  return `<!doctype html>
<html>
  <head>
    <title>${title}</title>
    ${styleSheet}
  </head>
  <body>
    <div id="${APP_CONTAINER_ID}"></div>
    <script src="${isProd
      ? STATIC_PATH
      : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </body>
</html>
`;
}

export default renderApp;
