'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJSON = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _redis = require('../services/redis');

var _redis2 = _interopRequireDefault(_redis);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseJSON = exports.parseJSON = function parseJSON(string) {

  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

exports.default = function (options) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key, duration, method) {
      var result, json, res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _redis2.default.getAsync(key);

            case 2:
              result = _context.sent;

              if (!result) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', parseJSON(result));

            case 5:
              _context.next = 7;
              return method();

            case 7:
              json = _context.sent;
              _context.next = 10;
              return _redis2.default.setAsync(key, (0, _stringify2.default)(json));

            case 10:
              res = _context.sent;
              _context.next = 13;
              return _redis2.default.expireAsync(key, duration);

            case 13:
              return _context.abrupt('return', json);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};