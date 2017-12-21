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

  var separator = getSeparator(req);

  var enclosure = getEnclosure(req);

  var records = (0, _core.coerceArray)(result);

  var matrix = _lodash2.default.isPlainObject(records[0]) ? toMatrix(req, records) : records;

  var wrapped = matrix.map(function (row) {
    return row.map(function (col) {
      return wrapWithEnclosure(col, enclosure);
    });
  });

  var output = wrapped.map(function (row) {
    return row.join(separator);
  }).join('\r\n');

  if (req.query.download) {

    var filename = req.query.filename || 'export';

    var datestamp = (0, _moment2.default)().format('YYYYMMDDHHmm');

    var ext = req.params.format === 'tsv' ? 'tsv' : 'csv';

    res.setHeader('Content-disposition', 'attachment; filename=' + filename + '-' + datestamp + '.' + ext);
  }

  res.status(200).type('text/plain').send(output);
};

var getSeparator = function getSeparator(req) {

  if (req.query.separator) {

    if (req.query.separator === 'tab') return '\t';

    return req.query.separator;
  }

  if (req.params.format === 'tsv') return '\t';

  return ',';
};

var getEnclosure = function getEnclosure(req) {

  if (req.query.enclosure) return req.query.enclosure;

  return '';
};

var toMatrix = function toMatrix(req, records) {

  var labels = (0, _core.selectedLabels)(req.query.$select, records[0]);

  var keys = (0, _core.selectedKeys)(req.query.$select, records[0]);

  return records.reduce(function (output, record) {
    return [].concat((0, _toConsumableArray3.default)(output), [keys.map(function (key) {

      var value = _lodash2.default.get(record, key);

      if (_lodash2.default.isDate(value)) return (0, _moment2.default)(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';

      return value;
    })]);
  }, [labels]);
};

var wrapWithEnclosure = function wrapWithEnclosure(value, enclosure) {
  return enclosure + value + enclosure;
};

exports.default = CsvResponder;