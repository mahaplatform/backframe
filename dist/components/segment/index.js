'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildSegment = exports.normalizeOptions = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _options = require('../../utils/options');

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var TYPES = (0, _core.mergeTypes)({
    afterCommit: { type: ['function', 'function[]'], required: false },
    afterProcessor: { type: ['function', 'function[]'], required: false },
    alterRequest: { type: ['function', 'function[]'], required: false },
    alterRecord: { type: ['function', 'function[]'], required: false },
    beforeProcessor: { type: ['function', 'function[]'], required: false },
    beforeRollback: { type: ['function', 'function[]'], required: false },
    pathPrefix: { type: 'string', required: false },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false },
    routes: { type: 'object[]', required: true, default: [] }
  }, backframeOptions.plugins);

  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    (0, _options.validateOptions)('segment', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildSegment(options);
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions);
};

// merge segment options and handlers with route handlers and flatten nested
// segments into an ordered array
var buildSegment = exports.buildSegment = function buildSegment(options) {

  var segmentOptions = _lodash2.default.omit(options, [].concat((0, _toConsumableArray3.default)(constants.BACKFRAME_HOOKS), ['pathPrefix', 'routes']));

  return _lodash2.default.flatten(options.routes).reduce(function (routes, route) {

    var path = options.pathPrefix ? options.pathPrefix + route.path : route.path;

    var routeOptions = (0, _extends3.default)({}, segmentOptions, route.options);

    var mergedRoute = {
      method: route.method,
      path: path,
      options: routeOptions,
      handler: (0, _extends3.default)({}, (0, _core.mergeHooks)({}, [options, route.handler]), (0, _core.mergeEvents)({}, [options, route.handler]))
    };

    return [].concat((0, _toConsumableArray3.default)(routes), [mergedRoute]);
  }, []);
};