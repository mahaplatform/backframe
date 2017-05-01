'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderError = exports.buildRouter = exports.normalizeOptions = undefined;

var _bluebird = require('bluebird');

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

var _not_found = require('./not_found');

var _not_found2 = _interopRequireDefault(_not_found);

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

var _logger = require('../../utils/logger');

var _response = require('../../utils/response');

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
      routes: { type: 'object[]', required: false }
    };

    (0, _options.validateOptions)('router', userOptions, TYPES);

    var mergedOptions = (0, _extends3.default)({}, _lodash2.default.pick(backframeOptions, ['knex', 'redis']), userOptions);

    var options = normalizeOptions(mergedOptions, TYPES);

    return buildRouter(backframeOptions, options, (0, _handler2.default)(backframeOptions));
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions);
};

// iterate through routing array and configure all events and hooks with
// accumuated routeOptions
var renderHandler = function renderHandler(plugins, route) {

  return (0, _extends3.default)({}, (0, _core.mergeHooks)({}, [].concat((0, _toConsumableArray3.default)(plugins), [route.handler]), route.options), (0, _core.mergeEvents)({}, [].concat((0, _toConsumableArray3.default)(plugins), [route.handler]), route.options));
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
    return buildHandler(_not_found2.default);
  });

  return router;
};

var buildRoute = function buildRoute(options, handler) {

  return function (req, res) {

    return (0, _bluebird.resolve)().then(function () {

      return (0, _logger.beginLogger)(options)();
    }).then(function () {

      return handler(req, res, _logger.recordTick);
    }).then(function (result) {

      return (0, _logger.endLogger)(options)().then(function () {
        return result;
      });
    }).then(function (result) {

      (0, _logger.printLogger)(options)(req, res, result);
    }).catch(function (err) {

      renderError(res, err);
    });
  };
};

var renderError = exports.renderError = function renderError(res, err) {

  if (_lodash2.default.includes(['development'], process.env.NODE_ENV)) console.log(err);

  if (err.name == 'BackframeError') return (0, _response.fail)(res, err.code, err.message, { errors: err.errors });

  return (0, _response.fail)(res, 500, err.message);
};