'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultResponder = exports.defaultRenderer = exports.defaultProcessor = exports.defaultQuery = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _response = require('./response');

var _core = require('./core');

var _csv_responder = require('../responders/csv_responder');

var _csv_responder2 = _interopRequireDefault(_csv_responder);

var _json_responder = require('../responders/json_responder');

var _json_responder2 = _interopRequireDefault(_json_responder);

var _xlsx_responder = require('../responders/xlsx_responder');

var _xlsx_responder2 = _interopRequireDefault(_xlsx_responder);

var _xml_responder = require('../responders/xml_responder');

var _xml_responder2 = _interopRequireDefault(_xml_responder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultQuery = exports.defaultQuery = function defaultQuery(req, options, qb, filters) {

  var tableName = options.model.extend().__super__.tableName;

  if (options.ownedByUser) {
    qb = qb.where(tableName + '.user_id', req.user.get('id'));
  }

  if (options.query) {
    options.query(qb, req, filters);
  }

  if (options.softDelete) {
    qb = qb.whereNull('deleted_at');
  }

  return qb;
};

var defaultProcessor = exports.defaultProcessor = function defaultProcessor(options) {
  return function (req, resolve, reject) {
    return resolve(null);
  };
};

var defaultRenderer = exports.defaultRenderer = function defaultRenderer(options) {
  return function (req, result, resolve, reject) {

    if (!result) return null;

    var renderer = (0, _render2.default)(options);

    var selector = (0, _core.selectFields)(req.query.$select);

    var transforms = req.query.$select ? [renderer, selector] : [renderer];

    var transform = function transform(req, result, transforms) {

      if (result.records) return (0, _core.applyToRecords)(req, result, transforms);

      return new Promise(function (resolve, reject) {
        return renderer(req, result, resolve, reject);
      }).then(function (result) {

        if (!req.query.$select) Promise.resolve(result);

        return new Promise(function (resolve, reject) {
          return selector(req, result, resolve, reject);
        });
      });
    };

    return transform(req, result, transforms).then(function (result) {

      resolve(result);
    }).catch(function (err) {

      throw err;
    });
  };
};

var defaultResponder = exports.defaultResponder = function defaultResponder(message) {
  return function (options) {
    return function (req, res, result, resolve, reject) {

      var format = req.params && req.params.format ? req.params.format : 'json';

      if (!_lodash2.default.includes(['csv', 'tsv', 'xlsx', 'xml', 'json'], format)) {
        return reject({ code: 415, message: 'We dont currently support this media type' });
      }

      var pagination = _lodash2.default.pick(result, ['all', 'total', 'limit', 'skip']);

      var data = _lodash2.default.get(result, 'records') ? result.records : result;

      var responders = { csvResponder: _csv_responder2.default, jsonResponder: _json_responder2.default, tsvResponder: _csv_responder2.default, xlsxResponder: _xlsx_responder2.default, xmlResponder: _xml_responder2.default };

      var responder = options[format + 'Responder'] || responders[format + 'Responder'];

      return responder(message, pagination, data, req, res, resolve, reject);
    };
  };
};