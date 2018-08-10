'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFoundRoute = new _route2.default({
  method: 'use',
  path: '*',
  processor: function processor(req, trx, options) {
    throw new _error2.default({ code: '404', message: 'Route not Found' });
  }
});

exports.default = NotFoundRoute;