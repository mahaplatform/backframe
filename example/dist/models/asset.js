'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Asset = _model2.default.extend({

  tableName: 'maha_assets',

  rules: {},

  virtuals: {}

});

exports.default = Asset;