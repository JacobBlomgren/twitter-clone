import * as R from 'ramda';

import updateOperations from './updateOperations';

/**
 * A higher order function that given a RabbitMQ channel returns a function
 * that when called consumes the most recent messages in the channel, and sends
 * the updates that they represent to the Elasticsearch client. Won't do any
 * api calls if updates is empty.
 *
 * @param elasticClient an Elasticsearch client
 * @param rabbitChannel a RabbitMQ channel.
 * @param updates a list of messages from the RabbitMQ channel.
 * @returns the (unhandled) messages that have been added to updates since this
 * function was called.
 */
export default async function(elasticClient, rabbitChannel, updates) {
  if (updates.length === 0) return updates;

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
    rabbitChannel.ack(batch[0], true);
    // return the unhandled messages.
    return updates.slice(0, updates.length - batch.length);
  } catch (_) {
    // If a failure occured, nack all the messages, and do not delete them
    // from the update list as they haven't been consumed.
    rabbitChannel.nack(batch[0], true);
    return updates;
  }
}
