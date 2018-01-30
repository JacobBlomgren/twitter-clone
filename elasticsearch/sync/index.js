/* eslint-disable import/first */
import '../../src/server/env';
import { connect } from 'amqplib';
import elasticClient from '../elasticsearch';
import update from './update';

// https://www.elastic.co/blog/found-keeping-elasticsearch-in-sync

let updates = [];

const q = 'tasks';

connect({
  protocol: 'amqp',
  hostname: process.env.RABBIT_HOST,
  port: process.env.RABBIT_PORT,
  username: process.env.RABBIT_USER,
  password: process.env.RABBIT_PASSWORD,
}).then(connection => {
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
