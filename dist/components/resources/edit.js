'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

exports.default = function (buildRoute, options) {

  var processor = function processor(req, trx, options) {
    return req.resource;
  };

  var renderer = function renderer(req, trx, result, options) {
    return result.toJSON();
  };

  return buildRoute({
    action: 'edit',
    method: 'get',
    path: '/:' + options.primaryKey + '/edit',
    processor: processor,
    renderer: renderer,
    responder: (0, _utils.defaultResponder)('Successfully found record')
  });
};