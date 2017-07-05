'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

exports.default = function (buildRoute) {

  var processor = function processor(options) {
    return function (req, trx) {
      return req.resource;
    };
  };

  var renderer = function renderer(options) {
    return function (req, trx, result) {
      return result.toJSON();
    };
  };

  return buildRoute({
    action: 'edit',
    method: 'get',
    path: '/:id/edit',
    processor: processor,
    renderer: renderer,
    responder: (0, _utils.defaultResponder)('Successfully found record')
  });
};