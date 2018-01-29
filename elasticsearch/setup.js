// Don't use es-modules and other modern features to simplify running
// (node elasticsearch/setup.js vs yarn babel-node elasticsearch/setup.js)

require('dotenv').config();

const client = require('./elasticsearch');

async function setup() {
  await Promise.all([
    client.indices.create({ index: 'user' }),
    client.indices.create({ index: 'tweet' }),
  ]);
}

setup();
