import '../lib/server/env';

import client from './elasticsearch';

async function setup() {
  await client.indices.create({ index: 'twitter' });
}

setup();
