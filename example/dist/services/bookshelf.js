'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bookshelf = require('bookshelf');

var _bookshelf2 = _interopRequireDefault(_bookshelf);

var _knex = require('./knex');

var _knex2 = _interopRequireDefault(_knex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookshelf = (0, _bookshelf2.default)(_knex2.default);

bookshelf.plugin('virtuals');

exports.default = bookshelf;