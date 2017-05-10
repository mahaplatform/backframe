'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginOptionDefaults = exports.mergeTypes = exports.mergeEvents = exports.mergeHooks = exports.selectedKeys = exports.selectedLabels = exports.selectFields = exports.includeAction = exports.applyToRecords = exports.toList = exports.flattenKeys = exports.mergeParams = exports.coerceArray = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

var _bluebird = require('bluebird');

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coerceArray = exports.coerceArray = function coerceArray(value) {

  return value ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var mergeParams = exports.mergeParams = function mergeParams() {
  var _arguments = arguments;


  return Array.apply(null, { length: arguments.length }).reduce(function (merged, value, index) {
    return _lodash2.default.uniq([].concat((0, _toConsumableArray3.default)(merged), (0, _toConsumableArray3.default)(coerceArray(_arguments[index]))));
  }, []);
};

// returns a flat list of all the nested keys in a hash
var flattenKeys = exports.flattenKeys = function flattenKeys(hash) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


  return (0, _keys2.default)(hash).reduce(function (keys, key) {
    return [].concat((0, _toConsumableArray3.default)(keys), (0, _toConsumableArray3.default)(_lodash2.default.isObject(hash[key]) ? flattenKeys(hash[key], '' + prefix + key + '.') : ['' + prefix + key]));
  }, []);
};

var toList = exports.toList = function toList(arr) {

  return arr.join(', ').replace(new RegExp(',$'), ', and');
};

var applyToRecords = exports.applyToRecords = function applyToRecords(req, trx, result, operations) {

  if (!operations) return result;

  var arrayOfOptions = coerceArray(operations);

  return (0, _bluebird.map)(result.records, function (record) {

    return (0, _bluebird.reduce)(arrayOfOptions, function (record, operation) {

      return operation(req, trx, record);
    }, record);
  }).then(function (records) {

    return (0, _extends7.default)({}, result, {
      records: records
    });
  });
};

var includeAction = exports.includeAction = function includeAction(action, only, except) {

  if (only) {
    var included = coerceArray(only);
    if (!_lodash2.default.includes(included, action)) {
      return false;
    }
  } else if (except) {
    var excluded = coerceArray(except);
    if (_lodash2.default.includes(excluded, action)) {
      return false;
    }
  }

  return true;
};

// cherry pick fields from a serialized record
var selectFields = exports.selectFields = function selectFields(select) {

  return function (req, trx, record) {

    var fields = selectedKeys(select, record);

    return select ? _lodash2.default.pick(record, fields) : record;
  };
};

var selectedLabels = exports.selectedLabels = function selectedLabels(select, record) {

  if (_lodash2.default.isPlainObject(select)) return (0, _keys2.default)(select);

  if (_lodash2.default.isNil(select)) return flattenKeys(record);

  return coerceArray(select);
};

var selectedKeys = exports.selectedKeys = function selectedKeys(select, record) {

  if (_lodash2.default.isPlainObject(select)) return (0, _values2.default)(select);

  if (_lodash2.default.isNil(select)) return flattenKeys(record);

  return coerceArray(select);
};

var mergeHooks = exports.mergeHooks = function mergeHooks(hooks, plugins) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


  return coerceArray(plugins).reduce(function (hooks, plugin) {

    var items = [].concat((0, _toConsumableArray3.default)(constants.BACKFRAME_HOOKS), ['defaultQuery']);

    return items.reduce(function (hooks, hook) {

      if (!plugin[hook]) return hooks;

      return (0, _extends7.default)({}, hooks, (0, _defineProperty3.default)({}, hook, [].concat((0, _toConsumableArray3.default)(coerceArray(hooks[hook])), (0, _toConsumableArray3.default)(coerceArray(plugin[hook]).map(function (hook) {
        return options ? hook(options) : hook;
      })))));
    }, hooks);
  }, hooks);
};

var mergeEvents = exports.mergeEvents = function mergeEvents(events, plugins) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


  return coerceArray(plugins).reduce(function (events, plugin) {

    return constants.BACKFRAME_EVENTS.reduce(function (events, event) {

      if (!plugin[event]) return events;

      return (0, _extends7.default)({}, events, (0, _defineProperty3.default)({}, event, options ? plugin[event](options) : plugin[event]));
    }, events);
  }, events);
};

var mergeTypes = exports.mergeTypes = function mergeTypes(types, plugins) {

  return coerceArray(plugins).reduce(function (types, plugin) {

    return (0, _keys2.default)(plugin.options).reduce(function (types, key) {
      return (0, _extends7.default)({}, types, (0, _defineProperty3.default)({}, key, plugin.options[key]));
    }, types);
  }, types);
};

var pluginOptionDefaults = exports.pluginOptionDefaults = function pluginOptionDefaults(plugins) {

  return coerceArray(plugins).reduce(function (defaults, plugin) {

    return (0, _keys2.default)(plugin.options).reduce(function (defaults, option) {

      if (!plugin.options[option]) return defaults;

      return (0, _extends7.default)({}, defaults, (0, _defineProperty3.default)({}, option, plugin.options[option].default));
    }, defaults);
  }, {});
};