'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var processor = function processor(options) {
    return function (req, resolve, reject) {
      return (0, _load2.default)(options)(req).then(resolve).catch(function (err) {
        reject({ code: 404, message: 'Unable to load resource' });
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