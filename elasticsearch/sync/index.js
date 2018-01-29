/* eslint-disable import/first */
import '../../src/server/env';
import * as R from 'ramda';
import { connect } from 'amqplib';

import elasticClient from '../elasticsearch';
import updateOperations from './updateOperations';

// https://www.elastic.co/blog/found-keeping-elasticsearch-in-sync

const updates = [];

/**
 * A higher order function that given a RabbitMQ channel returns a function
 * that when called consumes the most recent messages in the channel.
 * @param channel a RabbitMQ channel.
 */
function update(channel) {
  return async () => {
    if (updates.length === 0) return;

    // We copy the list so that if any new messages are asynchronously added,
    // they aren't included in this batch, but rather the next one.
    const batch = updates.slice();
    const deserialized = batch.map(
      R.pipe(msg => msg.content.toString(), JSON.parse),
    );

    try {
      await elasticClient.bulk({
        body: updateOperations(deserialized),
      });
      // acks all the recieved messages up to the first one in the batch list.
      channel.ack(batch[0], true);
      // remove the handled batch messages.
      updates.splice(updates.length - batch.length, batch.length);
    } catch (_) {
      // If a failure occured, nack all the messages, and do not delete them
      // from the update list as they haven't been consumed.
      channel.nack(batch[0], true);
    }
  };
}

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
      setInterval(update(channel), 1000);
    })
    .catch(console.warn);
});
