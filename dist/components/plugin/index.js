'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOptions = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _options = require('../../utils/options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var TYPES = {
    name: { type: 'string', required: true },
    options: { type: 'object', required: false, default: [] },
    alterRequest: { type: ['function', 'function[]'], required: false },
    alterRecord: { type: ['function', 'function[]'], required: false },
    before: { type: ['function', 'function[]'], required: false },
    defaultQuery: { type: ['function', 'function[]'], required: false },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false }
  };

  (0, _options.validateOptions)('plugin', userOptions, TYPES);

  return normalizeOptions(userOptions, TYPES);
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions);
};