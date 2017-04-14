'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugin = undefined;

var _backframe = require('./components/backframe');

var _backframe2 = _interopRequireDefault(_backframe);

var _plugin = require('./components/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugin = exports.plugin = _plugin2.default;

exports.default = _backframe2.default;