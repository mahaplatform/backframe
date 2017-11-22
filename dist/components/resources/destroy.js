'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _bluebird = require('bluebird');

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../../utils');

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute, options) {

  var destroyRelated = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(options, resource, trx) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (options.dependents) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', resource);

            case 2:
              _context2.next = 4;
              return (0, _bluebird.each)(options.dependents, function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dependent, index, length) {
                  var related_ids, results, records;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return resource.load([dependent.relationship], { transacting: trx });

                        case 2:
                          related_ids = resource.related(dependent.relationship).map(function (item) {
                            return item.id;
                          });

                          if (!(related_ids.length === 0)) {
                            _context.next = 5;
                            break;
                          }

                          return _context.abrupt('return');

                        case 5:
                          _context.next = 7;
                          return resource.related(dependent.relationship).model.query(function (qb) {
                            return qb.whereIn('id', related_ids);
                          }).fetchAll({ transacting: trx });

                        case 7:
                          results = _context.sent;
                          records = results.map(function (result) {
                            return result;
                          });
                          _context.next = 11;
                          return (0, _bluebird.each)(records, function (record, index, length) {

                            if (dependent.strategy === 'destroy') return record.destroy({ transacting: trx });

                            return record.save((0, _defineProperty3.default)({}, dependent.foreignKey, null), { patch: true, transacting: trx });
                          });

                        case 11:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x4, _x5, _x6) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function destroyRelated(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var destroyResource = function destroyResource(options, resource, trx) {

    if (options.softDelete) return resource.save({ deleted_at: new Date() }, { patch: true, transacting: trx });

    return resource.destroy({ transacting: trx });
  };

  var processor = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options) {
      var frozen;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;


              // create a frozen copy so that after hooks can still access properties
              frozen = (0, _assign2.default)({}, req.resource.attributes);
              _context3.next = 4;
              return destroyRelated(options, req.resource, trx);

            case 4:
              _context3.next = 6;
              return destroyResource(options, req.resource, trx);

            case 6:
              return _context3.abrupt('return', {
                get: function get(value) {
                  return frozen[value];
                }
              });

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);

              if (!_context3.t0.errors) {
                _context3.next = 13;
                break;
              }

              throw new _error2.default({ code: 422, message: 'Unable to delete ' + options.name, errors: _context3.t0.toJSON() });

            case 13:
              throw _context3.t0;

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 9]]);
    }));

    return function processor(_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();

  return buildRoute({
    action: 'destroy',
    method: 'delete',
    path: '/:' + options.primaryKey,
    processor: processor,
    responder: (0, _utils.defaultResponder)('Successfully deleted record')
  });
};