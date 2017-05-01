'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRoutingTable = exports.padString = exports.normalizeOptions = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _options = require('../../utils/options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return (0, _extends3.default)({}, (0, _options.defaultOptions)(types), userOptions);
};

var padString = exports.padString = function padString(text, length) {

  return text + '                                                                                       '.slice(0, length - text.length);
};

var buildRoutingTable = exports.buildRoutingTable = function buildRoutingTable(options) {

  var lines = [_chalk2.default.grey(' ======================================================================='), _chalk2.default.grey('|') + ' ' + _chalk2.default.white(padString('METHOD', 6)) + ' ' + _chalk2.default.grey('|') + ' ' + _chalk2.default.white(padString('PATH', 60)) + ' ' + _chalk2.default.grey('|'), _chalk2.default.grey('|=======================================================================|')].concat((0, _toConsumableArray3.default)(options.routes.reduce(function (lines, route) {
    if (options.method !== 'all' && options.method !== route.method) return lines;
    return [].concat((0, _toConsumableArray3.default)(lines), [_chalk2.default.grey('|') + ' ' + _chalk2.default.green(padString(route.method.toUpperCase(), 6)) + ' ' + _chalk2.default.grey('|') + ' ' + _chalk2.default.white(padString(route.path, 60)) + ' ' + _chalk2.default.grey('|')]);
  }, [])), [_chalk2.default.grey(' =======================================================================')]);

  return lines.join("\n") + "\n";
};