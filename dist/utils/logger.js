'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printLogger = exports.expandBenchmark = exports.recordTick = exports.endLogger = exports.beginLogger = exports.captureQueries = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queries = [];

var started = null;

var ticks = [];

var captureQueries = exports.captureQueries = function captureQueries(builder) {

  var startTime = process.hrtime();
  var group = [];

  builder.on('query', function (query) {
    group.push(query);
    queries.push(query);
  });

  builder.on('end', function () {
    var diff = process.hrtime(startTime);
    var ms = diff[0] * 1e3 + diff[1] * 1e-6;
    group.forEach(function (query) {
      query.duration = ms.toFixed(3);
    });
  });
};

var beginLogger = exports.beginLogger = function beginLogger(options) {
  return function () {

    queries = [];

    ticks = [];

    started = (0, _moment2.default)();

    options.knex.client.on('start', captureQueries);

    return _bluebird2.default.resolve();
  };
};

var endLogger = exports.endLogger = function endLogger(options) {
  return function () {

    options.knex.client.removeListener('start', captureQueries);

    return _bluebird2.default.resolve();
  };
};

var recordTick = exports.recordTick = function recordTick(event) {

  if (process.env.NODE_ENV === 'development') return _bluebird2.default.resolve();

  var timestamp = (0, _moment2.default)();

  ticks.push({ event: event, timestamp: timestamp });

  return _bluebird2.default.resolve();
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
    if (!_lodash2.default.isEmpty(req.params)) console.log('%s %s', _chalk2.default.red('PARAMS:'), JSON.stringify(req.params));
    if (!_lodash2.default.isEmpty(req.body)) console.log('%s %s', _chalk2.default.red('BODY:'), JSON.stringify(req.body));
    if (!_lodash2.default.isEmpty(req.query)) console.log('%s %s', _chalk2.default.red('QUERY:'), JSON.stringify(req.query));
    Object.keys(extra).map(function (key) {
      console.log('%s %s', _chalk2.default.red(key.toUpperCase() + ':'), JSON.stringify(extra[key]));
    });
    queries.forEach(function (query) {
      console.log('%s %s %s %s', _chalk2.default.green('SQL:'), query.sql, _chalk2.default.magenta('{' + query.bindings.join(', ') + '}'), _chalk2.default.grey(query.duration + 'ms'));
    });
    if (result && result.errors) console.log('%s %s', _chalk2.default.red('ERRORS:'), JSON.stringify(result.errors));
    if (!_lodash2.default.isEmpty(ticks)) console.log('%s %s', _chalk2.default.red('BENCHMERK:'), expandBenchmark(ticks));
    console.log('%s %s rendered in %sms', _chalk2.default.red('RESPONSE:'), res.statusCode, (0, _moment2.default)().diff(started, 'milliseconds'));
    console.log('=========================================================');
    console.log('');
  };
};