/* eslint-disable */
require('dotenv').config();

import client from './elasticsearch';

async function setup() {
  await Promise.all([
    client.indices.create({ index: 'user' }),
    client.indices.create({ index: 'tweet' }),
  ]);
}

setup();
