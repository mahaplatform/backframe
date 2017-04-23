'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOptionToActions = exports.mergeRouteOptions = exports.buildSingleRoute = exports.buildStandardRoutes = exports.buildCustomRoutes = exports.buildResources = exports.normalizeOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _options = require('../../utils/options');

var _segment = require('../segment');

var _segment2 = _interopRequireDefault(_segment);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

var _show = require('./show');

var _show2 = _interopRequireDefault(_show);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _destroy = require('./destroy');

var _destroy2 = _interopRequireDefault(_destroy);

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = (0, _core.mergeTypes)({
      actions: { type: 'object', required: false },
      afterHooks: { type: ['function', 'function{}'], required: false },
      allowedParams: { type: ['string[]', 'string[]{}'], required: false },
      alterRequest: { type: ['function', 'function{}'], required: false },
      alterRecord: { type: ['function', 'function{}'], required: false },
      beforeHooks: { type: ['function', 'function{}'], required: false },
      cacheFor: { type: 'integer', required: false },
      defaultParams: { type: 'function', required: false },
      defaultSort: { type: ['string', 'string[]'], required: false, default: '-created_at' },
      dependents: { type: 'object[]', required: false },
      except: { type: 'string[]', required: false },
      filterParams: { type: 'string[]', required: false },
      model: { type: 'object', required: true },
      name: { type: 'string', required: true },
      only: { type: 'string[]', required: false },
      path: { type: 'string', required: false },
      pathPrefix: { type: 'string', required: false },
      processor: { type: ['function', 'function{}'], required: false },
      query: { type: ['function', 'function{}'], required: false },
      renderer: { type: ['function', 'function{}'], required: false },
      responder: { type: ['function', 'function{}'], required: false },
      searchParams: { type: 'string[]', required: false },
      serializer: { type: ['function', 'function{}'], required: false },
      softDelete: { type: 'boolean', required: false, default: false },
      sortParams: { type: ['string', 'string[]'], required: false },
      withRelated: { type: ['string', 'string[]', 'string[]{}'], required: false }
    }, backframeOptions.plugins);

    (0, _options.validateOptions)('resources', userOptions, TYPES);

    var mergedOptions = _extends({}, _lodash2.default.pick(backframeOptions, ['knex', 'redis']), userOptions);

    var options = normalizeOptions(mergedOptions, TYPES);

    return buildResources(options, (0, _segment2.default)(backframeOptions), (0, _route2.default)(backframeOptions));
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  var derivedOptions = {
    path: (0, _pluralize2.default)(userOptions.name)
  };

  return _extends({}, (0, _options.defaultOptions)(types), derivedOptions, userOptions, mapOptionsToActions(userOptions, [].concat(_toConsumableArray(constants.BACKFRAME_LIFECYCLE), ['allowedParams', 'query', 'serializer', 'withRelated'])));
};

// build all rest and custom routes
var buildResources = exports.buildResources = function buildResources(options, buildSegment, buildRoute) {

  var pathPrefix = options.pathPrefix ? options.pathPrefix + '/' + options.path : '/' + options.path;

  return buildSegment({
    pathPrefix: pathPrefix,
    routes: [].concat(_toConsumableArray(buildCustomRoutes(options, buildRoute)), _toConsumableArray(buildStandardRoutes(options, buildRoute)))
  });
};

// build custom rest actions
var buildCustomRoutes = exports.buildCustomRoutes = function buildCustomRoutes(options, buildRoute) {

  if (!options.actions) return [];

  return Object.keys(options.actions).reduce(function (routes, name) {

    var action = options.actions[name];

    var path = action.on === 'collection' ? '/' + action.path : '/:id/' + action.path;

    var namespaced = _extends({}, action, { path: path });

    return [].concat(_toConsumableArray(routes), [buildSingleRoute(name, options, namespaced)]);
  }, []);
};

// build standard rest routes
var buildStandardRoutes = exports.buildStandardRoutes = function buildStandardRoutes(options, buildRoute) {

  var actions = { list: _list2.default, create: _create2.default, edit: _edit2.default, show: _show2.default, update: _update2.default, destroy: _destroy2.default };

  return Object.keys(actions).filter(function (action) {

    return (0, _core.includeAction)(action, options.only, options.except);
  }).reduce(function (routes, action) {

    var route = actions[action](buildRoute);

    return [].concat(_toConsumableArray(routes), [buildSingleRoute(action, options, route)]);
  }, []);
};

// build single rest route
var buildSingleRoute = exports.buildSingleRoute = function buildSingleRoute(name, options, route) {

  var mergedRouteOptions = mergeRouteOptions(name, options);

  var routeOptions = _lodash2.default.omit(mergedRouteOptions, [].concat(_toConsumableArray(constants.BACKFRAME_LIFECYCLE), ['actions', 'except', 'only', 'pathPrefix']));

  return _extends({}, route, {
    options: _extends({}, routeOptions, {
      action: name
    }),
    handler: _extends({}, (0, _core.mergeEvents)(route.handler, mergedRouteOptions), (0, _core.mergeHooks)(route.handler, mergedRouteOptions))
  });
};

// destructure mapped options and preapre hash to be merged
var mergeRouteOptions = exports.mergeRouteOptions = function mergeRouteOptions(name, options) {

  return _lodash2.default.omitBy(_extends({}, options, mergeOptionsForAction(options, constants.BACKFRAME_HOOKS, name), overrideOptionsForAction(options, [].concat(_toConsumableArray(constants.BACKFRAME_EVENTS), ['allowedParams', 'query', 'serializer', 'withRelated']), name)), _lodash2.default.isNil);
};

var mapOptionsToActions = function mapOptionsToActions(options, keys) {

  return keys.reduce(function (mapped, key) {
    return _extends({}, mapped, _defineProperty({}, key, mapOptionToActions(options[key])));
  }, {});
};

var mapOptionToActions = exports.mapOptionToActions = function mapOptionToActions(value) {

  return value !== null ? !_lodash2.default.isPlainObject(value) ? { all: value } : value : {};
};
// merge all and named option
var mergeOptionsForAction = function mergeOptionsForAction(options, keys, name) {

  return keys.reduce(function (merged, key) {
    return _extends({}, merged, _defineProperty({}, key, (0, _core.mergeParams)(options[key].all, options[key][name])));
  }, {});
};

// override all option with named option
var overrideOptionsForAction = function overrideOptionsForAction(options, keys, name) {

  return keys.reduce(function (mapped, key) {
    return _extends({}, mapped, _defineProperty({}, key, options[key][name] || options[key].all));
  }, {});
};