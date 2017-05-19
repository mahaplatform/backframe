'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fail = exports.succeed = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statuses = {
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  204: 'NO CONTENT',
  400: 'BAD REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  409: 'CONFLICT',
  412: 'DEVELOPER ERROR',
  415: 'UNSUPPORTED MEDIA TYPE',
  422: 'UNPROCESSABLE ENTRY',
  500: 'APPLICATION ERROR'
};

var response = function response(res, code, success, message, extra) {

  var status = statuses[code];

  var json = (0, _extends3.default)({
    meta: {
      success: success,
      status: status,
      message: message
    }
  }, extra);

  res.status(code).json(json);
};

var succeed = exports.succeed = function succeed(res, code, message) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return response(res, code, true, message, extra);
};

var fail = exports.fail = function fail(res, code, message) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return response(res, code, false, message, extra);
};