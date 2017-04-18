'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginOptionDefaults = exports.mergeTypes = exports.mergeEvents = exports.mergeHooks = exports.selectedKeys = exports.selectedLabels = exports.selectFields = exports.includeAction = exports.applyToRecords = exports.toList = exports.flattenKeys = exports.mergeParams = exports.coerceArray = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var coerceArray = exports.coerceArray = function coerceArray(value) {

  return value ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var mergeParams = exports.mergeParams = function mergeParams() {
  var _arguments = arguments;


  return Array.apply(null, { length: arguments.length }).reduce(function (merged, value, index) {
    return _lodash2.default.uniq([].concat(_toConsumableArray(merged), _toConsumableArray(coerceArray(_arguments[index]))));
  }, []);
};

// returns a flat list of all the nested keys in a hash
var flattenKeys = exports.flattenKeys = function flattenKeys(hash) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


  return Object.keys(hash).reduce(function (keys, key) {
    return [].concat(_toConsumableArray(keys), _toConsumableArray(_lodash2.default.isObject(hash[key]) ? flattenKeys(hash[key], '' + prefix + key + '.') : ['' + prefix + key]));
  }, []);
};

var toList = exports.toList = function toList(arr) {

  return arr.join(', ').replace(new RegExp(',$'), ', and');
};

var applyToRecords = exports.applyToRecords = function applyToRecords(req, result, operations) {

  if (!operations) return (0, _bluebird.resolve)(result);

  var arrayOfOptions = coerceArray(operations);

  return (0, _bluebird.map)(result.records, function (record) {

    return operations.reduce(function (promise, operation) {

      return promise.then(function (record) {
        return new _bluebird2.default(function (resolve, request) {
          return operation(req, record, resolve, request);
        });
      });
    }, (0, _bluebird.resolve)(record));
  }).then(function (records) {

    return _extends({}, result, {
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

  return function (req, record, resolve, reject) {

    var fields = selectedKeys(select, record);

    var selected = select ? _lodash2.default.pick(record, fields) : record;

    resolve(selected);
  };
};

var selectedLabels = exports.selectedLabels = function selectedLabels(select, record) {

  if (_lodash2.default.isPlainObject(select)) return Object.keys(select);

  if (_lodash2.default.isNil(select)) return flattenKeys(record);

  return coerceArray(select);
};

var selectedKeys = exports.selectedKeys = function selectedKeys(select, record) {

  if (_lodash2.default.isPlainObject(select)) return Object.values(select);

  if (_lodash2.default.isNil(select)) return flattenKeys(record);

  return coerceArray(select);
};

var mergeHooks = exports.mergeHooks = function mergeHooks(hooks, plugins) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


  return coerceArray(plugins).reduce(function (hooks, plugin) {

    return constants.BACKFRAME_HOOKS.reduce(function (hooks, hook) {

      if (!plugin[hook]) return hooks;

      return _extends({}, hooks, _defineProperty({}, hook, [].concat(_toConsumableArray(coerceArray(hooks[hook])), _toConsumableArray(coerceArray(plugin[hook]).map(function (hook) {
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

      return _extends({}, events, _defineProperty({}, event, options ? plugin[event](options) : plugin[event]));
    }, events);
  }, events);
};

var mergeTypes = exports.mergeTypes = function mergeTypes(types, plugins) {

  return coerceArray(plugins).reduce(function (types, plugin) {

    return Object.keys(plugin.options).reduce(function (types, key) {
      return _extends({}, types, _defineProperty({}, key, plugin.options[key]));
    }, types);
  }, types);
};

var pluginOptionDefaults = exports.pluginOptionDefaults = function pluginOptionDefaults(plugins) {

  return coerceArray(plugins).reduce(function (defaults, plugin) {

    return Object.keys(plugin.options).reduce(function (defaults, option) {

      if (!plugin.options[option]) return defaults;

      return _extends({}, defaults, _defineProperty({}, option, plugin.options[option].default));
    }, defaults);
  }, {});
};