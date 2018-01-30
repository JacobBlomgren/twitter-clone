/* eslint-disable */
require('dotenv').config();

const client = import('./elasticsearch');

async function setup() {
  await Promise.all([
    client.indices.create({ index: 'user' }),
    client.indices.create({ index: 'tweet' }),
  ]);
}

setup();
