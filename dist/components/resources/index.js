'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOptionToActions = exports.mergeRouteOptions = exports.buildSingleRoute = exports.buildStandardRoutes = exports.buildCustomRoutes = exports.buildResources = exports.normalizeOptions = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _options = require('../../utils/options');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

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

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = (0, _core.mergeTypes)({
      after: { type: ['function', 'function{}'], required: false },
      allowedParams: { type: ['string[]', 'string[]{}'], required: false },
      alterRequest: { type: ['function', 'function{}'], required: false },
      alterRecord: { type: ['function', 'function{}'], required: false },
      before: { type: ['function', 'function{}'], required: false },
      collectionActions: { type: 'object', required: false },
      defaultParams: { type: 'function', required: false },
      defaultSort: { type: ['string', 'string[]'], required: false, default: '-created_at' },
      dependents: { type: 'object[]', required: false },
      except: { type: ['string', 'string[]'], required: false },
      filterParams: { type: 'string[]', required: false, default: [] },
      memberActions: { type: 'object', required: false },
      model: { type: 'object', required: true },
      name: { type: 'string', required: false },
      only: { type: ['string', 'string[]'], required: false },
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

    var mergedOptions = (0, _extends6.default)({}, _lodash2.default.pick(backframeOptions, ['defaultFormat', 'defaultLimit', 'knex']), userOptions);

    var options = normalizeOptions(mergedOptions, TYPES);

    return buildResources(options, (0, _segment2.default)(backframeOptions), (0, _route2.default)(backframeOptions));
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  var name = userOptions.name || _pluralize2.default.singular(userOptions.model.extend().__super__.tableName);

  var derivedOptions = {
    name: name,
    path: _pluralize2.default.plural(name)
  };

  return (0, _extends6.default)({}, (0, _options.defaultOptions)(types), derivedOptions, userOptions, mapOptionsToActions(userOptions, [].concat((0, _toConsumableArray3.default)(constants.BACKFRAME_LIFECYCLE), ['allowedParams', 'query', 'serializer', 'withRelated'])));
};

// build all rest and custom routes
var buildResources = exports.buildResources = function buildResources(options, buildSegment, buildRoute) {

  var pathPrefix = options.pathPrefix ? options.pathPrefix + '/' + options.path : '/' + options.path;

  return buildSegment({
    pathPrefix: pathPrefix,
    routes: [].concat((0, _toConsumableArray3.default)(buildCustomRoutes(options.collectionActions, options, buildRoute, false)), (0, _toConsumableArray3.default)(buildCustomRoutes(options.memberActions, options, buildRoute, true)), (0, _toConsumableArray3.default)(buildStandardRoutes(options, buildRoute)))
  });
};

// build custom rest actions
var buildCustomRoutes = exports.buildCustomRoutes = function buildCustomRoutes(actions, options, buildRoute, id) {

  if (!actions) return [];

  return (0, _keys2.default)(actions).reduce(function (routes, name) {

    var action = actions[name];

    var path = id ? '/:id' + action.path : action.path;

    var namespaced = (0, _extends6.default)({}, action, { path: path });

    return [].concat((0, _toConsumableArray3.default)(routes), [buildSingleRoute(name, options, namespaced)]);
  }, []);
};

// build standard rest routes
var buildStandardRoutes = exports.buildStandardRoutes = function buildStandardRoutes(options, buildRoute) {

  var actions = { list: _list2.default, create: _create2.default, edit: _edit2.default, show: _show2.default, update: _update2.default, destroy: _destroy2.default };

  return (0, _keys2.default)(actions).filter(function (action) {

    return (0, _core.includeAction)(action, options.only, options.except);
  }).reduce(function (routes, action) {

    var route = actions[action](buildRoute);

    return [].concat((0, _toConsumableArray3.default)(routes), [buildSingleRoute(action, options, route)]);
  }, []);
};

// load resource before route
var loadResource = function loadResource(options) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, trx) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _load2.default)(options)(req, trx);

            case 2:
              req.resource = _context.sent;
              return _context.abrupt('return', req);

            case 4:
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

// build single rest route
var buildSingleRoute = exports.buildSingleRoute = function buildSingleRoute(name, options, route) {

  var mergedRouteOptions = mergeRouteOptions(name, options);

  var routeOptions = _lodash2.default.omit(mergedRouteOptions, [].concat((0, _toConsumableArray3.default)(constants.BACKFRAME_LIFECYCLE), ['actions', 'except', 'only', 'pathPrefix']));

  if (route.path.substr(0, 4) == '/:id') {

    route.handler.alterRequest = [].concat((0, _toConsumableArray3.default)((0, _core.coerceArray)(route.handler.alterRequest)), [loadResource]);
  }

  return (0, _extends6.default)({}, route, {
    options: (0, _extends6.default)({}, routeOptions, {
      action: name
    }),
    handler: (0, _extends6.default)({}, (0, _core.mergeEvents)(route.handler, mergedRouteOptions), (0, _core.mergeHooks)(route.handler, mergedRouteOptions))
  });
};

// destructure mapped options and preapre hash to be merged
var mergeRouteOptions = exports.mergeRouteOptions = function mergeRouteOptions(name, options) {

  return _lodash2.default.omitBy((0, _extends6.default)({}, options, mergeOptionsForAction(options, constants.BACKFRAME_HOOKS, name), overrideOptionsForAction(options, [].concat((0, _toConsumableArray3.default)(constants.BACKFRAME_EVENTS), ['allowedParams', 'query', 'serializer', 'withRelated']), name)), _lodash2.default.isNil);
};

var mapOptionsToActions = function mapOptionsToActions(options, keys) {

  return keys.reduce(function (mapped, key) {
    return (0, _extends6.default)({}, mapped, (0, _defineProperty3.default)({}, key, mapOptionToActions(options[key])));
  }, {});
};

var mapOptionToActions = exports.mapOptionToActions = function mapOptionToActions(value) {

  return value !== null ? !_lodash2.default.isPlainObject(value) ? { all: value } : value : {};
};

// merge all and named option
var mergeOptionsForAction = function mergeOptionsForAction(options, keys, name) {

  return keys.reduce(function (merged, key) {
    return (0, _extends6.default)({}, merged, (0, _defineProperty3.default)({}, key, (0, _core.mergeParams)(options[key].all, options[key][name])));
  }, {});
};

// override all option with named option
var overrideOptionsForAction = function overrideOptionsForAction(options, keys, name) {

  return keys.reduce(function (mapped, key) {
    return (0, _extends6.default)({}, mapped, (0, _defineProperty3.default)({}, key, options[key][name] || options[key].all));
  }, {});
};