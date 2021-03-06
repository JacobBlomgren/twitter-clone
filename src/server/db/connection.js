import pgp from 'pg-promise';

const pgpInitialized = pgp();
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.NODE_ENV !== 'test' ? 'twitter' : 'twitter_test',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  client_encoding: 'UTF8',
};
const db = pgpInitialized(config);
const pgpHelpers = pgpInitialized.helpers;

export { db, pgpHelpers };
