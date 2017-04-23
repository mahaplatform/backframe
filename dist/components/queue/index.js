'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQueue = exports.normalizeOptions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _options = require('../../utils/options');

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {};

    (0, _options.validateOptions)('handler', userOptions, TYPES);

    var options = normalizeOptions(userOptions, TYPES);

    return buildQueue(options);
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, types) {

  return _extends({}, (0, _options.defaultOptions)(types), userOptions);
};

var buildQueue = exports.buildQueue = function buildQueue(options) {};