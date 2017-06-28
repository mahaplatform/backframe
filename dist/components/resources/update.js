'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _utils = require('../../utils');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

var _options = require('../../utils/options');

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var alterRequest = function alterRequest(options) {
    return function (req) {

      req.data = _lodash2.default.assign(req.body, req.query);

      return req;
    };
  };

  var before = function before(options) {
    return function (req) {

      var allowed = [].concat((0, _toConsumableArray3.default)((0, _core.coerceArray)(options.allowedParams)), (0, _toConsumableArray3.default)((0, _core.coerceArray)(options.virtualParams)));

      (0, _options.checkPermitted)(req.data, allowed, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams');
    };
  };

  var processor = function processor(options) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, trx) {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                data = _lodash2.default.pick(req.data, options.allowedParams);
                _context.next = 4;
                return req.resource.save(data, { patch: true, transacting: trx });

              case 4:
                return _context.abrupt('return', _context.sent);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                if (!_context.t0.errors) {
                  _context.next = 11;
                  break;
                }

                throw new _error2.default({ code: 422, message: 'Unable to update record', errors: _context.t0.toJSON() });

              case 11:
                throw _context.t0;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 7]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  };

  return buildRoute({
    action: 'update',
    method: 'patch',
    path: '/:id',
    alterRequest: alterRequest,
    before: before,
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully updated record')
  });
};