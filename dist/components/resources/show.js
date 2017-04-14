'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils');

var _load = require('../../utils/load');

var _load2 = _interopRequireDefault(_load);

var _csv = require('../../renderers/csv');

var _csv2 = _interopRequireDefault(_csv);

var _json = require('../../renderers/json');

var _json2 = _interopRequireDefault(_json);

var _xlsx = require('../../renderers/xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _xml = require('../../renderers/xml');

var _xml2 = _interopRequireDefault(_xml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (buildRoute) {

  var processor = function processor(options) {
    return function (req, resolve, reject) {
      return (0, _load2.default)(options)(req).then(resolve).catch(function (err) {
        reject({ code: 404, message: 'Unable to load resource' });
      });
    };
  };

  var renderer = function renderer(options) {
    return (0, _utils.defaultRenderer)(options);
  };

  var responder = function responder(options) {
    return function (req, res, result, resolve, reject) {

      var format = req.params.format || 'json';

      switch (format) {

        case 'csv':
          return (0, _csv2.default)(',')({}, result, req, res, resolve, reject);

        case 'tsv':
          return (0, _csv2.default)('\t')({}, result, req, res, resolve, reject);

        case 'xlsx':
          return (0, _xlsx2.default)({}, result, req, res, resolve, reject);

        case 'xml':
          return (0, _xml2.default)({}, result, req, res, resolve, reject);

        case 'json':
          return (0, _json2.default)({}, result, req, res, resolve, reject);

        default:
          return reject({ code: 415, message: 'We dont currently support this media type' });

      }
    };
  };

  return buildRoute({
    method: 'get',
    path: '/:id',
    processor: processor,
    renderer: renderer,
    responder: responder
  });
};