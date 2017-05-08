'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printQueue = exports.printLogger = exports.expandBenchmark = exports.recordTick = exports.endLogger = exports.beginLogger = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _knex = require('../services/knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queries = [];

var started = null;

var ticks = [];

var startTime = null;

var startQuery = function startQuery(query) {
  startTime = process.hrtime();
  queries.push(query);
};

var endQuery = function endQuery(response, query) {
  if (!query.__knexQueryUid) return;
  var diff = process.hrtime(startTime);
  var ms = diff[0] * 1e3 + diff[1] * 1e-6;
  var index = _lodash2.default.findIndex(queries, { __knexQueryUid: query.__knexQueryUid });
  queries[index].duration = ms.toFixed(3);
};

var beginLogger = exports.beginLogger = function beginLogger(options) {
  return function () {

    queries = [];

    ticks = [];

    started = (0, _moment2.default)();

    _knex2.default.client.on('query', startQuery).on('query-response', endQuery);
  };
};

var endLogger = exports.endLogger = function endLogger(options) {
  return function () {

    _knex2.default.client.removeListener('query', startQuery).removeListener('query-response', endQuery);
  };
};

var recordTick = exports.recordTick = function recordTick(event) {

  if (process.env.NODE_ENV !== 'development') return true;

  var timestamp = (0, _moment2.default)();

  ticks.push({ event: event, timestamp: timestamp });
};

var expandBenchmark = exports.expandBenchmark = function expandBenchmark(ticks) {

  var pointer = started;

  return ticks.map(function (tick) {

    var duration = tick.timestamp.diff(pointer, 'milliseconds');

    pointer = tick.timestamp;

    return tick.event + ': ' + duration + 'ms';
  }).join(', ');
};

var printLogger = exports.printLogger = function printLogger(options) {
  return function (req, res, result) {

    var extra = options.log ? options.log(req) : {};

    console.log('=========================================================');
    console.log('%s %s', _chalk2.default.red(req.method), req.path);
    console.log('=========================================================');
    if (!_lodash2.default.isEmpty(req.params)) console.log('%s %s', _chalk2.default.red('PARAMS:'), (0, _stringify2.default)(req.params));
    if (!_lodash2.default.isEmpty(req.body)) console.log('%s %s', _chalk2.default.red('BODY:'), (0, _stringify2.default)(req.body));
    if (!_lodash2.default.isEmpty(req.query)) console.log('%s %s', _chalk2.default.red('QUERY:'), (0, _stringify2.default)(req.query));
    (0, _keys2.default)(extra).map(function (key) {
      console.log('%s %s', _chalk2.default.red(key.toUpperCase() + ':'), (0, _stringify2.default)(extra[key]));
    });
    queries.forEach(function (query) {
      var duration = query.duration ? _chalk2.default.grey(query.duration + 'ms') : '';
      console.log('%s %s %s %s', _chalk2.default.green('SQL:'), query.sql, query.bindings ? _chalk2.default.magenta('{' + query.bindings.join(', ') + '}') : '', duration);
    });
    if (result && result.errors) console.log('%s %s', _chalk2.default.red('ERRORS:'), (0, _stringify2.default)(result.errors));
    if (!_lodash2.default.isEmpty(ticks)) console.log('%s %s', _chalk2.default.red('BENCHMERK:'), expandBenchmark(ticks));
    console.log('%s %s rendered in %sms', _chalk2.default.red('RESPONSE:'), res.statusCode, (0, _moment2.default)().diff(started, 'milliseconds'));
    console.log('=========================================================');
    console.log('');
  };
};

var printQueue = exports.printQueue = function printQueue(options) {
  return function (job, result) {

    console.log(result);

    console.log('=========================================================');
    console.log('%s %s', _chalk2.default.red('QUEUE:'), options.name);
    console.log('=========================================================');
    if (!_lodash2.default.isEmpty(job)) console.log('%s %s', _chalk2.default.red('DATA:'), (0, _stringify2.default)(job.data));
    queries.forEach(function (query) {
      var duration = query.duration ? _chalk2.default.grey(query.duration + 'ms') : '';
      console.log('%s %s %s %s', _chalk2.default.green('SQL:'), query.sql, query.bindings ? _chalk2.default.magenta('{' + query.bindings.join(', ') + '}') : '', duration);
    });
    if (result && result.errors) console.log('%s %s', _chalk2.default.red('ERRORS:'), (0, _stringify2.default)(result.errors));
    if (result) console.log('%s %s', _chalk2.default.red('RESULT:'), (0, _stringify2.default)(result));
    if (!_lodash2.default.isEmpty(ticks)) console.log('%s %s', _chalk2.default.red('BENCHMERK:'), expandBenchmark(ticks));
    console.log('%s rendered in %sms', _chalk2.default.red('RESPONSE:'), (0, _moment2.default)().diff(started, 'milliseconds'));
    console.log('=========================================================');
    console.log('');
  };
};