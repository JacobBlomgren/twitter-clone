/* eslint-disable import/first */
import '../src/server/env';
import { connect } from 'amqplib';

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
      channel.sendToQueue(q, Buffer.from('{"userID": "1", "name": "Jacob"}'));
    })
    .catch(console.warn);
});
