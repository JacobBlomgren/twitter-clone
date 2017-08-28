import fs from 'fs';

const index = fs.readFileSync('./dist/index.html');
console.log('here should only happen once');

export default function renderApp(req, res) {
  res.set('Content-Type', 'text/html');
  res.send(index);
}
