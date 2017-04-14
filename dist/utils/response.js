'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

  var json = _extends({
    meta: {
      success: success,
      status: status,
      message: message
    }
  }, extra);

  res.status(code).json(json);

  return json;
};

var succeed = exports.succeed = function succeed(res, code, message) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return response(res, code, true, message, extra);
};

var fail = exports.fail = function fail(res, code, message) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return response(res, code, false, message, extra);
};