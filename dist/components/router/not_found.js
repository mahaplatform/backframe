'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _response = require('../../utils/response');

var processor = function processor(req, resolve, reject) {
  return resolve();
};

var responder = function responder(req, res, data, resolve, reject) {

  var result = (0, _response.fail)(res, 404, 'Unable to locate route');

  resolve(result);
};

exports.default = { processor: processor, responder: responder };