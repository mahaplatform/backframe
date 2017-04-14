'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printOptionErrors = exports.defaultOptions = exports.getOperation = exports.checkRequired = exports.checkType = exports.checkTypes = exports.checkOptions = exports.validateOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var validateOptions = exports.validateOptions = function validateOptions(type, options, definitions) {

  var valid = checkOptions(options, definitions);

  var name = options.name || options.path || '';

  if (valid !== true) {

    // console.log(valid)

    if (process.env.NODE_ENV === 'development') {
      printOptionErrors(type, name, valid);
    }

    throw new Error();
  }
};

var checkOptions = exports.checkOptions = function checkOptions(options, definitions) {

  var errors = Object.keys(definitions).reduce(function (errors, key) {

    var customActions = options.actions ? Object.keys(options.actions) : [];

    var allowedActions = ['all', 'create', 'destroy', 'list', 'show', 'update'].concat(_toConsumableArray(customActions));

    var definition = definitions[key];

    var option = options[key];

    var error = [];

    return [].concat(_toConsumableArray(errors), _toConsumableArray(checkTypes(option, key, definition.type, allowedActions)), _toConsumableArray(checkRequired(option, key, definition.required)));
  }, []);

  return errors.length === 0 ? true : errors;
};

// check if each option matches the specified types
var checkTypes = exports.checkTypes = function checkTypes(option, key, types, allowedActions) {

  if (!option) return [];

  var valid = (0, _core.coerceArray)(types).reduce(function (valid, type) {

    if (valid) return true;

    return checkType(option, type, allowedActions);
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

    return Object.keys(option).reduce(function (valid, key) {

      if (!valid) return valid;

      var value = option[key];

      return _lodash2.default.includes(allowedActions, key) && checkType(value, mapped[1], allowedActions);
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

  return Object.keys(types).reduce(function (defaults, type) {
    return _extends({}, defaults, types[type].default ? _defineProperty({}, type, types[type].default) : {});
  });
};

var printOptionErrors = exports.printOptionErrors = function printOptionErrors(type, name, issues) {

  [_chalk2.default.red('================================================================================'), _chalk2.default.white('Unable to build ' + type + ' \'' + name + '\''), _chalk2.default.red('================================================================================'), _chalk2.default.white('We found the following problems with your configuration:')].concat(_toConsumableArray(issues.map(function (issue) {
    return _chalk2.default.grey('> ' + issue);
  })), [_chalk2.default.red('================================================================================')]).map(function (statement) {
    return console.log(statement);
  });
};