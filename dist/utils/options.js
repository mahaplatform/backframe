'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printOptionErrors = exports.checkPermitted = exports.defaultOptions = exports.getOperation = exports.checkRequired = exports.checkType = exports.checkTypes = exports.checkOptions = exports.validateOptions = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateOptions = exports.validateOptions = function validateOptions(type, options, definitions) {

  var valid = checkOptions(options, definitions);

  var name = options.name || options.path || '';

  if (valid !== true) {

    if (process.env.NODE_ENV === 'development') {
      printOptionErrors(type, name, valid);
    }

    throw new Error();
  }
};

var checkOptions = exports.checkOptions = function checkOptions(options, definitions) {

  var errors = (0, _keys2.default)(definitions).reduce(function (errors, key) {

    var customActions = options.actions ? (0, _keys2.default)(options.actions) : [];

    var allowedActions = ['all', 'create', 'destroy', 'list', 'show', 'update'].concat((0, _toConsumableArray3.default)(customActions));

    var definition = definitions[key];

    var option = options[key];

    var error = [];

    return [].concat((0, _toConsumableArray3.default)(errors), (0, _toConsumableArray3.default)(checkTypes(option, key, definition.type, allowedActions)), (0, _toConsumableArray3.default)(checkRequired(option, key, definition.required)));
  }, []);

  return errors.length === 0 ? true : errors;
};

// check if each option matches the specified types
var checkTypes = exports.checkTypes = function checkTypes(option, key, types, allowedActions) {

  if (!option) return [];

  var valid = (0, _core.coerceArray)(types).reduce(function (valid, type) {

    return valid || checkType(option, type, allowedActions);
  }, false);

  return !valid ? ['attribute "' + key + '" must be of type ' + (0, _core.coerceArray)(types).join(' or ')] : [];
};

// recursively check if option matches the specified type
var checkType = exports.checkType = function checkType(option, type, allowedActions) {

  var array = type.match(/^(\w*)\[\]$/);

  var mapped = type.match(/^(\w*)\{\}$/);

  if (array && _lodash2.default.isArray(option)) {

    return option.reduce(function (valid, value) {

      if (!valid) return valid;

      return checkType(value, array[1], allowedActions);
    }, true);
  } else if (mapped && _lodash2.default.isPlainObject(option)) {

    return (0, _keys2.default)(option).reduce(function (valid, key) {

      if (!valid) return valid;

      var value = option[key];

      return checkType(value, mapped[1], allowedActions);
      // return _.includes(allowedActions, key) && checkType(value, mapped[1], allowedActions)
    }, true);
  } else if (!array && !mapped) {

    return getOperation(type)(option);
  }

  return false;
};

// check if each required option is set
var checkRequired = exports.checkRequired = function checkRequired(option, key, required) {

  return required && _lodash2.default.isNil(option) ? ['attribute "' + key + '" is required'] : [];
};

// helper fuction for evaluating type of option
var getOperation = exports.getOperation = function getOperation(type) {
  if (type === 'array') return _lodash2.default.isArray;
  if (type === 'boolean') return _lodash2.default.isBoolean;
  if (type === 'function') return _lodash2.default.isFunction;
  if (type === 'integer') return _lodash2.default.isInteger;
  if (type === 'object') return _lodash2.default.isObject;
  if (type === 'string') return _lodash2.default.isString;
};

// extract option defualts
var defaultOptions = exports.defaultOptions = function defaultOptions(types) {

  return (0, _keys2.default)(types).reduce(function (defaults, type) {
    return (0, _extends3.default)({}, defaults, types[type].default ? (0, _defineProperty3.default)({}, type, types[type].default) : {});
  }, {});
};

var checkPermitted = exports.checkPermitted = function checkPermitted(items, permitted, message) {

  if (process.env.NODE_ENV != 'development') return true;

  var keys = _lodash2.default.isPlainObject(items) ? (0, _keys2.default)(items) : (0, _core.coerceArray)(items);

  var unpermitted = keys.filter(function (key) {
    return !_lodash2.default.includes((0, _core.coerceArray)(permitted), key);
  });

  if (unpermitted.length > 0) {
    throw new _error2.default({ code: 412, message: message.replace('{unpermitted}', (0, _core.toList)(unpermitted)) });
  }
};

var printOptionErrors = exports.printOptionErrors = function printOptionErrors(type, name, issues) {

  [_chalk2.default.red('================================================================================'), _chalk2.default.white('Unable to build ' + type + ' \'' + name + '\''), _chalk2.default.red('================================================================================'), _chalk2.default.white('We found the following problems with your configuration:')].concat((0, _toConsumableArray3.default)(issues.map(function (issue) {
    return _chalk2.default.grey('> ' + issue);
  })), [_chalk2.default.red('================================================================================')]).map(function (statement) {
    return console.log(statement);
  });
};