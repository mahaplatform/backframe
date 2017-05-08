'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

require('./environment');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$DATABASE = process.env.DATABASE_URL.match(/(.*)\:\/\/\/?(.*)/),
    _process$env$DATABASE2 = (0, _slicedToArray3.default)(_process$env$DATABASE, 3),
    client = _process$env$DATABASE2[1],
    database = _process$env$DATABASE2[2];

var connection = _lodash2.default.includes(['sqlite3', 'sqlite'], client) ? database : process.env.DATABASE_URL;

module.exports = new _knex2.default({
  client: client,
  connection: connection,
  pool: {
    min: 3,
    max: 5
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'schema_migrations',
    directory: './src/db/migrations'
  },
  seeds: {
    directory: './src/db'
  }
});