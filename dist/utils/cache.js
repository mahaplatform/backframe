"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cache = exports.parseJSON = undefined;

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseJSON = exports.parseJSON = function parseJSON(string) {

  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

var cache = exports.cache = function cache(options) {

  var redis = options.redis;

  return function (key, duration, method) {

    return redis.getAsync(key).then(function (result) {

      if (result) {

        return {
          cached: true,
          data: parseJSON(result)
        };
      }

      return method();
    }).then(function (json) {

      if (json.cached) {
        return json.data;
      }

      return redis.setAsync(key, (0, _stringify2.default)(json)).then(function (result) {

        return redis.expireAsync(key, duration);
      }).then(function (result) {

        return json;
      });
    });
  };
};

exports.default = cache;