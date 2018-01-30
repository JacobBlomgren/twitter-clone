import { connect } from 'amqplib';

export default () =>
  connect({
    protocol: 'amqp',
    hostname: process.env.RABBIT_HOST,
    port: process.env.RABBIT_PORT,
    username: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
  });
