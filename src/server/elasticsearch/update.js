import connect from '../../../lib/elasticsearch/rabbitMQ';

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

function request(msg, method) {
  return Buffer.from(JSON.stringify({ ...msg, method }));
}

/**
 * Updates the Elasticsearch server with the new user or tweet data. The message
 * must either have a userID property or a tweetID property. The rest of the
 * object is the updated properties.
 * @param {object} msg - the update message
 */
export function update(msg) {
  channel.sendToQueue(q, request(msg, 'update'));
}

/**
 * Creates a new entity similarly to {@link update}, but with the create method.
 * @param {object} msg - the update message
 */
export function create(msg) {
  channel.sendToQueue(q, request(msg, 'index'));
}
