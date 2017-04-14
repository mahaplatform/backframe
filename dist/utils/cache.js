"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

      return redis.setAsync(key, JSON.stringify(json)).then(function (result) {

        return redis.expireAsync(key, duration);
      }).then(function (result) {

        return json;
      });
    });
  };
};

exports.default = cache;