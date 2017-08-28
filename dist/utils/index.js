'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultResponder = exports.defaultRenderer = exports.defaultProcessor = exports.defaultParams = exports.defaultQuery = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _response = require('./response');

var _core = require('./core');

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _csv_responder = require('../responders/csv_responder');

var _csv_responder2 = _interopRequireDefault(_csv_responder);

var _json_responder = require('../responders/json_responder');

var _json_responder2 = _interopRequireDefault(_json_responder);

var _xlsx_responder = require('../responders/xlsx_responder');

var _xlsx_responder2 = _interopRequireDefault(_xlsx_responder);

var _xml_responder = require('../responders/xml_responder');

var _xml_responder2 = _interopRequireDefault(_xml_responder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultQuery = exports.defaultQuery = function defaultQuery(req, trx, qb, options) {

  if (options.defaultQuery) {

    (0, _core.coerceArray)(options.defaultQuery).map(function (defaultQuery) {

      defaultQuery(req, trx, qb, options);
    });
  }

  if (options.softDelete) {
    qb.whereNull('deleted_at');
  }
};

var defaultParams = exports.defaultParams = function defaultParams(req, trx, options) {

  if (options.defaultParams) {
    return options.defaultParams.reduce(function (params, defaultParams) {
      return (0, _extends3.default)({}, params, defaultParams(req, trx, options));
    }, {});
  }

  return {};
};
var defaultProcessor = exports.defaultProcessor = function defaultProcessor(req, options) {
  return null;
};

var defaultRenderer = exports.defaultRenderer = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, trx, result, options) {
    var selector, transforms, transform;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (result) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt('return', null);

          case 2:
            selector = (0, _core.selectFields)(req.query.$select);
            transforms = req.query.$select ? [renderer, selector] : [_render2.default];

            transform = function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, trx, result, transforms, options) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!result.records) {
                          _context.next = 4;
                          break;
                        }

                        _context.next = 3;
                        return (0, _core.applyToRecords)(req, trx, result, transforms, options);

                      case 3:
                        return _context.abrupt('return', _context.sent);

                      case 4:
                        _context.next = 6;
                        return (0, _render2.default)(req, trx, result, options);

                      case 6:
                        result = _context.sent;

                        if (req.query.$select) {
                          _context.next = 9;
                          break;
                        }

                        return _context.abrupt('return', result);

                      case 9:
                        _context.next = 11;
                        return selector(req, trx, result);

                      case 11:
                        return _context.abrupt('return', _context.sent);

                      case 12:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function transform(_x5, _x6, _x7, _x8, _x9) {
                return _ref2.apply(this, arguments);
              };
            }();

            _context2.next = 7;
            return transform(req, trx, result, transforms, options);

          case 7:
            return _context2.abrupt('return', _context2.sent);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function defaultRenderer(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var defaultResponder = exports.defaultResponder = function defaultResponder(message) {
  return function (req, res, result, options) {

    var format = req.params && req.params.format ? req.params.format : options.defaultFormat;

    if (!_lodash2.default.includes(['csv', 'tsv', 'xlsx', 'xml', 'json'], format)) {
      throw new _error2.default({ code: 415, message: 'We dont currently support this media type' });
    }

    var hasRecords = _lodash2.default.get(result, 'records');

    var pagination = hasRecords ? _lodash2.default.pick(result, ['all', 'total', 'limit', 'skip']) : null;

    var data = hasRecords ? result.records : result;

    var responders = { csvResponder: _csv_responder2.default, jsonResponder: _json_responder2.default, tsvResponder: _csv_responder2.default, xlsxResponder: _xlsx_responder2.default, xmlResponder: _xml_responder2.default };

    var responder = options[format + 'Responder'] || responders[format + 'Responder'];

    return responder(message, pagination, data, req, res);
  };
};