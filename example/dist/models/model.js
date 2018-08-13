'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookshelf = require('../services/bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

var _checkit = require('checkit');

var _checkit2 = _interopRequireDefault(_checkit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Model = _bookshelf2.default.Model.extend({

  hasTimestamps: true,

  initialize: function initialize(attrs, opts) {
    this.on('saving', this.validateSave);
  },

  validateSave: function validateSave() {
    return new _checkit2.default(this.rules).run(this.attributes);
  }

});

exports.default = Model;