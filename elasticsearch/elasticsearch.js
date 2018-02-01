import { Client } from 'elasticsearch';

export default new Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  log: 'trace',
});
