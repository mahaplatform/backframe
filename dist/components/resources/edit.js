'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var processor = function processor(options) {
    return function (req, trx) {
      return req.resource;
    };
  };

  var renderer = function renderer(options) {
    return function (req, result) {
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