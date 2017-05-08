'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

require('./environment');

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env$DATABASE = process.env.DATABASE_URL.match(/(.*)\:\/\/\/(.*)/),
    _process$env$DATABASE2 = (0, _slicedToArray3.default)(_process$env$DATABASE, 3),
    client = _process$env$DATABASE2[1],
    database = _process$env$DATABASE2[2];

var connection = client === 'sqlite3' ? database : process.env.DATABASE_URL;

module.exports = new _knex2.default({
  client: client,
  connection: connection,
  pool: {
    min: 3,
    max: 5
  }
});