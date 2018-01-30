import connect from '../../../elasticsearch/lib/rabbitMQ';

const q = 'tasks';
let channel;

connect().then(connection => {
  connection
    .createChannel()
    .then(ch => {
      ch.assertQueue(q);
      channel = ch;
    })
    // eslint-disable-next-line no-console
    .catch(console.warn);
});

/**
 * Updates the Elasticsearch with the new user or tweet data. The message must
 * either have a userID property or a tweetID property. The rest of the object
 * is the updated properties.
 * @param {object} msg - the update message
 */
export default function update(msg) {
  channel.sendToQueue(q, Buffer.from(JSON.stringify(msg)));
}
