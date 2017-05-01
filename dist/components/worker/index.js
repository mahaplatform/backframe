'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildWorker = exports.normalizeOptions = undefined;

var _bluebird = require('bluebird');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bull = require('bull');

var _bull2 = _interopRequireDefault(_bull);

var _logger = require('../../utils/logger');

var _options = require('../../utils/options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {
      queues: { type: 'object[]', required: false }
    };

    (0, _options.validateOptions)('router', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildWorker(options);
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return _extends({}, (0, _options.defaultOptions)(types), userOptions);
};

var buildWorker = exports.buildWorker = function buildWorker(options) {

  options.queues.map(function (queueOptions) {

    var queue = (0, _bull2.default)(queueOptions.name, 6379, '127.0.0.1');

    var process = buildProcess(options, queueOptions.handler);

    queue.process(process);
  });
};

var buildProcess = function buildProcess(options, handler) {

  return function (job, done) {

    console.log('here');

    return (0, _bluebird.resolve)().then(function () {

      return (0, _logger.beginLogger)(options)();
    }).then(function () {

      return handler(job);
    }).then(function (result) {

      return (0, _logger.endLogger)(options)().then(function () {
        return result;
      });
    }).then(function (result) {

      return (0, _logger.printLogger)(options)(req, res, result);
    }).then(function (result) {

      return done(null, result);
    });
  };
};