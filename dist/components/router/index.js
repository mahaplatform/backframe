'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRouter = exports.normalizeOptions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _options = require('../../utils/options');

var _core = require('../../utils/core');

var _handler = require('../handler');

var _handler2 = _interopRequireDefault(_handler);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _not_found = require('./not_found');

var _not_found2 = _interopRequireDefault(_not_found);

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
      cors: { type: 'boolean', required: false, default: false },
      log: { type: 'function', required: false },
      notFound: { type: 'boolean', required: false, default: true },
      pathPrefix: { type: 'string', required: false },
      routes: { type: 'object[]', required: false }
    };

    (0, _options.validateOptions)('router', userOptions, TYPES);

    var mergedOptions = (0, _extends4.default)({}, _lodash2.default.pick(backframeOptions, ['knex']), userOptions);

    var options = normalizeOptions(mergedOptions, TYPES);

    return buildRouter(backframeOptions, options, (0, _handler2.default)(backframeOptions), (0, _route2.default)(backframeOptions));
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends4.default)({}, (0, _options.defaultOptions)(types), userOptions, {
    routes: _lodash2.default.flatten(userOptions.routes)
  });
};

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
var mergeLifecycle = function mergeLifecycle(plugins, route) {

  return (0, _extends4.default)({}, (0, _core.mergeHooks)({}, [].concat((0, _toConsumableArray3.default)(plugins), [route.handler])), (0, _core.mergeEvents)({}, [].concat((0, _toConsumableArray3.default)(plugins), [route.handler])));
};

var renderHandler = function renderHandler(lifecycle, options) {

  return (0, _keys2.default)(lifecycle).reduce(function (keys, key) {
    return (0, _extends4.default)({}, keys, (0, _defineProperty3.default)({}, key, _lodash2.default.isArray(lifecycle[key]) ? lifecycle[key].map(function (item) {
      return item(options);
    }) : lifecycle[key](options)));
  }, {});
};

// iterate through routing array and generate express router
var buildRouter = exports.buildRouter = function buildRouter(backframeOptions, options, buildHandler, buildRoute) {

  var router = (0, _express.Router)({ mergeParams: true });

  router.use(_bodyParser2.default.urlencoded({ extended: true }));
  router.use(_bodyParser2.default.json());

  if (options.cors) router.use((0, _cors2.default)());

  options.routes.map(function (route) {

    var path = options.pathPrefix ? options.pathPrefix + route.path : route.path;

    var merged = mergeLifecycle(backframeOptions.plugins, route);

    var handlerLifecycle = _lodash2.default.pick(merged, constants.BACKFRAME_LIFECYCLE);

    var handlerOptions = (0, _extends4.default)({}, route.options, _lodash2.default.omit(merged, constants.BACKFRAME_LIFECYCLE));

    var rendered = renderHandler(handlerLifecycle, handlerOptions);

    var handler = _lodash2.default.isFunction(route.handler) ? route.handler : buildHandler(rendered);

    var wrapped = wrapWithLogger(options, handler);

    router[route.method](path.replace(':id', ':id(\\d+)') + '.:format?', wrapped);
  });

  if (options.notFound) router.use(options.pathPrefix, wrapWithLogger(options, _not_found2.default));

  return router;
};

var wrapWithLogger = function wrapWithLogger(options, handler) {

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res) {
      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              (0, _logger.beginLogger)(options)();

              _context.next = 3;
              return handler(req, res, _logger.recordTick);

            case 3:
              result = _context.sent;


              (0, _logger.endLogger)(options)();

              (0, _logger.printLogger)(options)(req, res, result);

            case 6:
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