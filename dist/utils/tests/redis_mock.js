'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  getAsync: function getAsync(key) {
    return _bluebird2.default.resolve(key);
  },

  setAsync: function setAsync(key, value) {
    return _bluebird2.default.resolve(value);
  },

  expireAsync: function expireAsync(key, duration) {}

};