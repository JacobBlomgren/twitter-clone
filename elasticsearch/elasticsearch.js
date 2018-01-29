const elasticsearch = require('elasticsearch');

module.exports = new elasticsearch.Client({
  host: `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
  log: 'trace',
});
