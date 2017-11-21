import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>App</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="http://localhost:7000/dist/js/main.bundle.js"></script>
        <script src="http://localhost:7000/dist/js/polyfills.bundle.js"></script>
      </body>
    </html>`);
});

export default router;
