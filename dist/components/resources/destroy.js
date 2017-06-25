'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

var _utils = require('../../utils');

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var destroyRelated = function destroyRelated(options, resource, trx) {

    if (!options.dependents) return resource;

    return (0, _bluebird.each)(options.dependents, function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dependent, index, length) {
        var results, records;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return dependent.model.where((0, _defineProperty3.default)({}, dependent.foreignKey, resource.get('id'))).fetchAll({ transacting: trx });

              case 2:
                results = _context.sent;
                records = results.map(function (result) {
                  return result;
                });
                return _context.abrupt('return', (0, _bluebird.each)(records, function (record, index, length) {

                  if (dependent.strategy === 'destroy') return record.destroy({ transacting: trx });

                  return record.save((0, _defineProperty3.default)({}, dependent.foreignKey, null), { patch: true, transacting: trx });
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
  };

  var destroyResource = function destroyResource(options, resource, trx) {

    if (options.softDelete) return resource.save({ deleted_at: new Date() }, { patch: true, transacting: trx });

    return resource.destroy({ transacting: trx });
  };

  var processor = function processor(options) {
    return function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, trx) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return destroyRelated(options, req.resource, trx);

              case 3:
                return _context2.abrupt('return', destroyResource(options, req.resource, trx));

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                if (!_context2.t0.errors) {
                  _context2.next = 10;
                  break;
                }

                throw new _error2.default({ code: 422, message: 'Unable to delete ' + options.name, errors: _context2.t0.toJSON() });

              case 10:
                throw _context2.t0;

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined, [[0, 6]]);
      }));

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();
  };

  return buildRoute({
    action: 'destroy',
    method: 'delete',
    path: '/:id',
    processor: processor,
    responder: (0, _utils.defaultResponder)('Successfully deleted record')
  });
};