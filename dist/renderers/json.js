'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _response = require('../utils/response');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (pagination, data, req, res, resolve, reject) {

  var extra = req.query.$page ? { pagination: pagination, data: data } : { data: data };

  var message = _lodash2.default.isArray(data) ? 'Sucessfully found records' : 'Sucessfully found record';

  (0, _response.succeed)(res, 200, message, extra);

  resolve();
};