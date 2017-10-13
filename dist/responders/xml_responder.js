'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _core = require('../utils/core');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _xml = require('xml');

var _xml2 = _interopRequireDefault(_xml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XmlResponder = function XmlResponder(message, pagination, result, req, res) {

  var toXML = function toXML(hash) {

    return (0, _keys2.default)(hash).map(function (key) {

      var value = hash[key];

      return (0, _defineProperty3.default)({}, key, _lodash2.default.isPlainObject(value) ? toXML(value) : value);
    });
  };

  var paginationSegment = pagination ? {
    pagination: [{ all: pagination.all }, { total: pagination.total }, { limit: pagination.limit }, { skip: pagination.skip }]
  } : null;

  var records = (0, _core.coerceArray)(result);

  var dataSegment = {
    data: records.map(function (record) {
      return {
        record: toXML(record)
      };
    })
  };

  var data = (0, _xml2.default)({
    response: pagination ? [paginationSegment, dataSegment] : [dataSegment]
  }, true);

  if (req.query.download) {

    var filename = req.query.filename || 'export';

    var datestamp = moment().format('YYYYMMDDHHmm');

    res.setHeader('Content-disposition', 'attachment; filename=' + filename + '-' + datestamp + '.xml');
  }

  res.status(200).type('application/xml').send(data);
};

exports.default = XmlResponder;