'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRouter = exports.normalizeOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _not_found = require('./not_found');

var _not_found2 = _interopRequireDefault(_not_found);

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

var _logger = require('../../utils/logger');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {
      cors: { type: 'boolean', required: false, default: false },
      log: { type: 'function', required: false },
      notFound: { type: 'boolean', required: false, default: true },
      routes: { type: 'object[]', required: false }
    };

    (0, _options.validateOptions)('router', userOptions, TYPES);

    var mergedOptions = _extends({}, _lodash2.default.pick(backframeOptions, ['knex', 'redis']), userOptions);

    var options = normalizeOptions(mergedOptions, TYPES);

    return buildRouter(backframeOptions, options, (0, _handler2.default)(backframeOptions));
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return _extends({}, (0, _options.defaultOptions)(types), userOptions);
};

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
var renderHandler = function renderHandler(plugins, route) {

  return _extends({}, (0, _core.mergeHooks)({}, [].concat(_toConsumableArray(plugins), [route.handler]), route.options), (0, _core.mergeEvents)({}, [].concat(_toConsumableArray(plugins), [route.handler]), route.options));
};

// iterate through routing array and generate express router
var buildRouter = exports.buildRouter = function buildRouter(backframeOptions, options, buildHandler) {

  var router = (0, _express.Router)({ mergeParams: true });

  router.use(_bodyParser2.default.urlencoded({ extended: true }));
  router.use(_bodyParser2.default.json());

  if (options.cors) router.use((0, _cors2.default)());

  options.routes.map(function (route) {

    var path = options.prefix ? options.prefix + route.path : route.path;

    var handler = _lodash2.default.isFunction(route.handler) ? route.handler : buildHandler(renderHandler(backframeOptions.plugins, route));

    var wrapped = buildRoute(options, handler);

    router[route.method](path.replace(':id', ':id(\\d+)') + '.:format?', wrapped);
  });

  if (options.notFound) router.use(function (req, res) {
    return logger(options)(req, res, buildHandler(_not_found2.default));
  });

  return router;
};

var buildRoute = function buildRoute(options, handler) {

  return function (req, res) {

    return Promise.resolve().then(function () {

      return (0, _logger.beginLogger)(options)();
    }).then(function () {

      return handler(req, res, _logger.recordTick);
    }).then(function (result) {

      return (0, _logger.endLogger)(options)().then(function () {
        return result;
      });
    }).then(function (result) {

      (0, _logger.printLogger)(options)(req, res, result);
    });
  };
};