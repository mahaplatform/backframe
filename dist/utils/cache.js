"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cache = exports.parseJSON = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseJSON = exports.parseJSON = function parseJSON(string) {

  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

var cache = exports.cache = function cache(options) {

  var redis = options.redis;

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key, duration, method) {
      var result, json;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return redis.getAsync(key);

            case 2:
              result = _context.sent;

              if (!result) {
                _context.next = 7;
                break;
              }

              _context.t0 = {
                cached: true,
                data: parseJSON(result)
              };
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return method();

            case 9:
              _context.t0 = _context.sent;

            case 10:
              json = _context.t0;

              if (!json.cached) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", json.data);

            case 13:
              _context.next = 15;
              return redis.setAsync(key, (0, _stringify2.default)(json));

            case 15:
              _context.next = 17;
              return redis.expireAsync(key, duration);

            case 17:
              return _context.abrupt("return", json);

            case 18:
            case "end":
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

exports.default = cache;