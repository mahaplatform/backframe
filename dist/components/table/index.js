'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRoutingTable = exports.padString = exports.normalizeOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _options = require('../../utils/options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {
      method: { type: 'string', required: false, default: 'all' },
      routes: { type: 'object[]', required: false, default: [] }
    };

    (0, _options.validateOptions)('table', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildRoutingTable(options);
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return _extends({}, (0, _options.defaultOptions)(types), userOptions);
};

var padString = exports.padString = function padString(text, length) {

  return text + '                                                                                       '.slice(0, length - text.length);
};

var buildRoutingTable = exports.buildRoutingTable = function buildRoutingTable(options) {

  var lines = [_chalk2.default.grey(' ======================================================================='), _chalk2.default.grey('|') + ' ' + _chalk2.default.white(padString('METHOD', 6)) + ' ' + _chalk2.default.grey('|') + ' ' + _chalk2.default.white(padString('PATH', 60)) + ' ' + _chalk2.default.grey('|'), _chalk2.default.grey('|=======================================================================|')].concat(_toConsumableArray(options.routes.reduce(function (lines, route) {
    if (options.method !== 'all' && options.method !== route.method) return lines;
    return [].concat(_toConsumableArray(lines), [_chalk2.default.grey('|') + ' ' + _chalk2.default.green(padString(route.method.toUpperCase(), 6)) + ' ' + _chalk2.default.grey('|') + ' ' + _chalk2.default.white(padString(route.path, 60)) + ' ' + _chalk2.default.grey('|')]);
  }, [])), [_chalk2.default.grey(' =======================================================================')]);

  return lines.join("\n") + "\n";
};