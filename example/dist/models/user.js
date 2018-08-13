'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _asset = require('./asset');

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _model2.default.extend({

  tableName: 'maha_users',

  rules: {
    'first_name': ['required'],
    'last_name': ['required'],
    'email': ['required', 'email']
  },

  virtuals: {},

  photo: function photo() {
    return this.belongsTo(_asset2.default, 'photo_id');
  }

});

exports.default = User;