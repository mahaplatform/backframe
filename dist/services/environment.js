'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_fs2.default.existsSync('.env')) {
  _dotenv2.default.load();
}