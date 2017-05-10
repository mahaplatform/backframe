'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _response = require('../../utils/response');

exports.default = function (req, res) {
  return (0, _response.fail)(res, 404, 'Unable to locate route');
};