'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../../utils/core');

var _utils = require('../../utils');

var _options = require('../../utils/options');

var _error = require('../../utils/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var alterRequest = function alterRequest(options) {
    return function (req) {

      req.data = _lodash2.default.assign(req.body, req.defaults, req.query);

      return req;
    };
  };

  var beforeHooks = function beforeHooks(options) {
    return function (req) {

      (0, _options.checkPermitted)(req.data, options.allowedParams, 'Unable to create record with the values {unpermitted}. Please add it to allowedParams');
    };
  };

  var processor = function processor(options) {
    return function (req, trx) {

      var data = (0, _extends3.default)({}, options.defaultParams ? options.defaultParams(req) : {}, _lodash2.default.pick(req.data, options.allowedParams));

      return options.model.forge(data).save(null, { transacting: trx }).catch(function (err) {

        if (err.errors) throw new _error2.default({ code: 422, message: 'Unable to create record', errors: err.toJSON() });

        throw err;
      });
    };
  };

  return buildRoute({
    method: 'post',
    path: '',
    alterRequest: alterRequest,
    beforeHooks: beforeHooks,
    processor: processor,
    renderer: _utils.defaultRenderer,
    responder: (0, _utils.defaultResponder)('Successfully created record')
  });
};