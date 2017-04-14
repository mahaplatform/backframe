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
    return function (req, resolve, reject) {
      return (0, _load2.default)(options)(req).then(resolve);
    };
  };

  var renderer = function renderer(options) {
    return function (req, result, resolve, reject) {
      return resolve(result);
    };
  };

  var responder = function responder(options) {
    return (0, _utils.defaultResponder)(200, 'Successfully found record');
  };

  return buildRoute({
    method: 'get',
    path: '/:id/edit',
    processor: processor,
    renderer: renderer,
    responder: responder
  });
};