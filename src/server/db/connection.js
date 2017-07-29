import pgp from 'pg-promise';
import promise from 'bluebird';

const pgpInitialized = pgp({ promiseLib: promise });
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: 'twitter',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};
const db = pgpInitialized(config);

export default db;
