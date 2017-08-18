'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var processor = function processor(req, trx, options) {
    return req.resource;
  };

  return buildRoute({
    action: 'show',
    method: 'get',
    path: '/:id',
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully found record')
  });
};