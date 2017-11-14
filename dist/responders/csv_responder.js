'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _core = require('../utils/core');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CsvResponder = function CsvResponder(message, pagination, result, req, res) {

  var separator = req.params.format === 'tsv' ? '\t' : ',';

  var records = (0, _core.coerceArray)(result);

  var matrix = _lodash2.default.isPlainObject(records[0]) ? toMatrix(req, records) : records;

  var output = matrix.map(function (row) {
    return row.join(separator);
  }).join('\n');

  if (req.query.download) {

    var filename = req.query.filename || 'export';

    var datestamp = (0, _moment2.default)().format('YYYYMMDDHHmm');

    var ext = req.params.format === 'tsv' ? 'tsv' : 'csv';

    res.setHeader('Content-disposition', 'attachment; filename=' + filename + '-' + datestamp + '.' + ext);
  }

  res.status(200).type('text/plain').send(output);
};

var toMatrix = function toMatrix(req, records) {

  var separator = req.params.format === 'tsv' ? '\t' : ',';

  var enclosure = req.query.enclosure || '';

  var labels = (0, _core.selectedLabels)(req.query.$select, records[0]);

  var keys = (0, _core.selectedKeys)(req.query.$select, records[0]);

  return records.reduce(function (output, record) {
    return [].concat((0, _toConsumableArray3.default)(output), [keys.map(function (key) {

      var value = _lodash2.default.get(record, key);

      if (_lodash2.default.isDate(value)) return wrapWithEnclosure((0, _moment2.default)(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z', enclosure);

      return wrapWithEnclosure(value, enclosure);
    })]);
  }, [labels.map(function (label) {
    return wrapWithEnclosure(label, enclosure);
  })]);
};

var wrapWithEnclosure = function wrapWithEnclosure(value, enclosure) {
  return enclosure + value + enclosure;
};

exports.default = CsvResponder;