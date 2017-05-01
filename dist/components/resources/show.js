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

  var processor = function processor(options) {
    return function (req, trx) {
      return (0, _load2.default)(options)(req, trx).catch(function (err) {
        throw new _error2.default({ code: 404, message: 'Unable to load resource' });
      });
    };
  };

  return buildRoute({
    method: 'get',
    path: '/:id',
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully found record')
  });
};