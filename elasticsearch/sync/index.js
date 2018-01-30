/* eslint-disable import/first */
require('dotenv').config();

import connect from '../rabbitMQ';
import elasticClient from '../elasticsearch';
import update from './update';

let updates = [];

const q = 'tasks';

// Keeps elasticsearch in sync with a RabbitMQ queue for updates from the main
// server as suggested here
// https://www.elastic.co/blog/found-keeping-elasticsearch-in-sync
connect().then(connection => {
  connection
    .createChannel()
    .then(channel => {
      channel.assertQueue(q);
      channel.prefetch(1000, true);
      channel.consume(q, msg => updates.unshift(msg));
      setInterval(async () => {
        updates = await update(elasticClient, channel, updates);
      }, 1000);
    })
    // eslint-disable-next-line no-console
    .catch(console.warn);
});
