'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRouter = exports.normalizeOptions = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

    var mergedOptions = (0, _extends3.default)({}, _lodash2.default.pick(backframeOptions, ['knex']), userOptions);

    var options = normalizeOptions(mergedOptions, TYPES);

    return buildRouter(backframeOptions, options, (0, _handler2.default)(backframeOptions), (0, _route2.default)(backframeOptions));
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions, {
    routes: _lodash2.default.flatten(userOptions.routes)
  });
};

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
var mergeLifecycle = function mergeLifecycle(plugins, route) {

  return (0, _extends3.default)({}, (0, _core.mergeHooks)({}, [].concat((0, _toConsumableArray3.default)(plugins), [route.handler])), (0, _core.mergeEvents)({}, [].concat((0, _toConsumableArray3.default)(plugins), [route.handler])));
};

// iterate through routing array and generate express router
var buildRouter = exports.buildRouter = function buildRouter(backframeOptions, options, buildHandler, buildRoute) {

  var router = (0, _express.Router)({ mergeParams: true });

  router.use(_bodyParser2.default.urlencoded({ extended: true }));

  router.use(_bodyParser2.default.json());

  if (options.cors) router.use((0, _cors2.default)());

  options.routes.map(function (route) {

    var path = options.pathPrefix ? options.pathPrefix + route.path : route.path;

    var formattedPath = path.replace(':id', ':id(\\d+)') + '.:format?';

    var merged = mergeLifecycle(backframeOptions.plugins, route);

    var handlerOptions = (0, _extends3.default)({}, route.options, merged);

    var handler = _lodash2.default.isFunction(route.handler) ? route.handler : buildHandler(handlerOptions);

    router[route.method](formattedPath, handler);
  });

  var pathPrefix = options.pathPrefix || '';

  if (options.notFound) router.use(pathPrefix, _not_found2.default);

  return router;
};