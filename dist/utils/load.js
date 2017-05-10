'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../utils');

var _error = require('../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, trx) {
      var tableName, fetchOptions, query, record;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tableName = options.model.extend().__super__.tableName;
              fetchOptions = options.withRelated ? { withRelated: (0, _utils.coerceArray)(options.withRelated), transacting: trx } : { transacting: trx };

              query = function query(qb) {

                qb = (0, _utils.defaultQuery)(options)(req, trx, qb);

                qb.where(tableName + '.id', req.params.id);
              };

              _context.next = 5;
              return options.model.query(query).fetch(fetchOptions);

            case 5:
              record = _context.sent;

              if (record) {
                _context.next = 8;
                break;
              }

              throw new _error2.default({ code: 404, message: 'Unable to find ' + options.name });

            case 8:
              return _context.abrupt('return', record);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};