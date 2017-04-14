'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var alterRequest = function alterRequest(options) {
    return function (req, resolve, reject) {

      req.data = _extends({}, req.body, req.defaults, req.query);

      resolve(req);
    };
  };

  var beforeHooks = function beforeHooks(options) {
    return function (req, resolve, reject) {

      var unpermitted = Object.keys(req.data).filter(function (key) {
        return !_lodash2.default.includes((0, _core.coerceArray)(options.allowedParams), key);
      });

      if (unpermitted.length > 0 && process.env.NODE_ENV == 'development') {
        return reject({ code: 412, message: 'Unable to create record with the values ' + (0, _core.toList)(unpermitted) });
      }

      resolve();
    };
  };

  var processor = function processor(options) {
    return function (req, resolve, reject) {

      var data = _extends({}, options.defaultParams ? options.defaultParams(req) : {}, _lodash2.default.pick(req.data, options.allowedParams));

      return options.model.forge(data).save().then(resolve).catch(function (err) {

        if (err.errors) return reject({ code: 422, message: 'Unable to create record', errors: err.toJSON() });

        reject({ code: 500, message: err.message });
      });
    };
  };

  var renderer = function renderer(options) {
    return (0, _utils.defaultRenderer)(options);
  };

  var responder = function responder(options) {
    return (0, _utils.defaultResponder)(200, 'Successfully created record');
  };

  return buildRoute({
    method: 'post',
    path: '',
    alterRequest: alterRequest,
    beforeHooks: beforeHooks,
    processor: processor,
    renderer: renderer,
    responder: responder
  });
};