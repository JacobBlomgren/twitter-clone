import fs from 'fs';
import express from 'express';

const router = express.Router();

const index = fs
  .readFileSync('./dist/index.html', 'utf8')
  .replace('INJECT', '<div id="root"></div>');

router.get('*', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(index);
});

export default router;
