'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildWorker = exports.normalizeOptions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _bull = require('bull');

var _bull2 = _interopRequireDefault(_bull);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _options = require('../../utils/options');

var _core = require('../../utils/core');

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

var _logger = require('../../utils/logger');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {
      queues: { type: 'object[]', required: false }
    };

    (0, _options.validateOptions)('worker', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildWorker(backframeOptions, options, (0, _handler2.default)(backframeOptions));
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends4.default)({}, (0, _options.defaultOptions)(types), userOptions);
};

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
var renderHandler = function renderHandler(plugins, queue) {

  return (0, _extends4.default)({}, (0, _core.mergeHooks)({}, [].concat((0, _toConsumableArray3.default)(plugins), [queue.handler]), queue.options), (0, _core.mergeEvents)({}, [].concat((0, _toConsumableArray3.default)(plugins), [queue.handler]), queue.options));
};

// iterate through routing array and generate express router
var buildWorker = exports.buildWorker = function buildWorker(backframeOptions, options, buildHandler) {

  var config = {
    redis: {
      url: process.env.REDIS_URL
    }
  };

  return options.queues.reduce(function (queues, queue) {

    var handler = buildHandler(renderHandler(backframeOptions.plugins, queue));

    var newQueue = new _bull2.default(queue.options.name, config);

    newQueue.process(buildProcess(queue.options, handler));

    return (0, _extends4.default)({}, queues, (0, _defineProperty3.default)({}, queue.options.name, newQueue));
  }, {});
};

var buildProcess = function buildProcess(options, handler) {

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(job, done) {
      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              (0, _logger.beginLogger)(options)();

              _context.next = 3;
              return handler(job, {}, _logger.recordTick);

            case 3:
              result = _context.sent;


              console.log(result);

              (0, _logger.endLogger)(options)();

              (0, _logger.printQueue)(options)(job, result);

              done(result);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};