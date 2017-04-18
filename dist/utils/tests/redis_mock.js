"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require("bluebird");

exports.default = {

  getAsync: function getAsync(key) {
    return (0, _bluebird.resolve)(key);
  },

  setAsync: function setAsync(key, value) {
    return (0, _bluebird.resolve)(value);
  },

  expireAsync: function expireAsync(key, duration) {}

};