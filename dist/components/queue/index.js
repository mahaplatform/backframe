'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQueue = exports.normalizeOptions = undefined;

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


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = (0, _core.mergeTypes)({
      after: { type: ['function', 'function[]'], required: false },
      alterRequest: { type: ['function', 'function[]'], required: false },
      before: { type: ['function', 'function[]'], required: false },
      name: { type: 'string', required: true },
      processor: { type: 'function', required: false },
      renderer: { type: 'function', required: false },
      responder: { type: 'function', required: false },
      serializer: { type: 'function', required: false }
    }, backframeOptions.plugins);

    (0, _options.validateOptions)('queue', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildQueue(options);
  };
};

// normalize and merge defaut options


var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions);
};

var buildQueue = exports.buildQueue = function buildQueue(options) {

  return {
    options: _lodash2.default.omit(options, constants.BACKFRAME_LIFECYCLE),
    handler: _lodash2.default.pick(options, constants.BACKFRAME_LIFECYCLE)
  };
};