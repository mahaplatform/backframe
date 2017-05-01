'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _response = require('../../utils/response');

var processor = function processor(req) {
  return '';
};

var responder = function responder(req, res, data) {

  return (0, _response.fail)(res, 404, 'Unable to locate route');
};

exports.default = { processor: processor, responder: responder };