'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xml = require('xml');

var _xml2 = _interopRequireDefault(_xml);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _core = require('../utils/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (message, pagination, result, req, res, resolve, reject) {

  var toXML = function toXML(hash) {

    return Object.keys(hash).map(function (key) {

      var value = hash[key];

      return _defineProperty({}, key, _lodash2.default.isPlainObject(value) ? toXML(value) : value);
    });
  };

  var paginationSegment = {
    pagination: [{ all: pagination.all }, { total: pagination.total }, { limit: pagination.limit }, { skip: pagination.skip }]
  };

  var records = (0, _core.coerceArray)(result);

  var dataSegment = {
    data: records.map(function (record) {
      return {
        record: toXML(record)
      };
    })
  };

  var data = (0, _xml2.default)({
    response: req.query.$page ? [paginationSegment, dataSegment] : [dataSegment]
  }, true);

  res.status(200).type('application/xml').send(data);

  resolve();
};