'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRoute = exports.normalizeOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _options = require('../../utils/options');

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = (0, _core.mergeTypes)({
      afterHooks: { type: ['function', 'function[]'], required: false },
      alterRequest: { type: ['function', 'function[]'], required: false },
      beforeHooks: { type: ['function', 'function[]'], required: false },
      cacheFor: { type: 'integer', required: false },
      handler: { type: 'function', required: false },
      method: { type: 'string', required: true, default: 'get' },
      path: { type: 'string', required: true },
      processor: { type: 'function', required: false },
      renderer: { type: 'function', required: false },
      responder: { type: 'function', required: false },
      serializer: { type: 'function', required: false }
    }, backframeOptions.plugins);

    (0, _options.validateOptions)('route', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildRoute(options);
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return _extends({}, (0, _options.defaultOptions)(types), userOptions);
};

// convert options into route fomat { method, path, options, handler]}
var buildRoute = exports.buildRoute = function buildRoute(options) {

  return {
    method: options.method,
    path: options.path,
    options: _lodash2.default.omit(options, [].concat(_toConsumableArray(constants.BACKFRAME_LIFECYCLE), ['method', 'path'])),
    handler: options.handler || _lodash2.default.pick(options, constants.BACKFRAME_LIFECYCLE)
  };
};