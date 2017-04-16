'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _utils = require('../../utils');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var alterRequest = function alterRequest(options) {
    return function (req, resolve, reject) {

      req.data = _extends({}, req.body, req.query);

      resolve(req);
    };
  };

  var beforeHooks = function beforeHooks(options) {
    return function (req, resolve, reject) {

      var unpermitted = Object.keys(req.data).filter(function (key) {
        return !_lodash2.default.includes((0, _core.coerceArray)(options.allowedParams), key);
      });

      if (unpermitted.length > 0 && process.env.NODE_ENV == 'development') {
        return reject({ code: 422, message: 'Unable to update record with the values ' + (0, _core.toList)(unpermitted) + '. Please add it to \'allowedParams\'' });
      }

      resolve();
    };
  };

  var processor = function processor(options) {
    return function (req, resolve, reject) {

      return (0, _load2.default)(options)(req).then(function (resource) {

        var data = _lodash2.default.pick(req.data, options.allowedParams);

        return resource.save(data, { patch: true }).then(resolve);
      }).catch(function (err) {

        if (err.errors) return reject({ code: 422, message: 'Unable to update record', errors: err.toJSON() });

        throw err;
      });
    };
  };

  return buildRoute({
    method: 'patch',
    path: '/:id',
    alterRequest: alterRequest,
    beforeHooks: beforeHooks,
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully updated record')
  });
};