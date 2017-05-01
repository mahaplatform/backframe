'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _core = require('../utils/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (message, pagination, result, req, res) {

  var separator = req.params.format === 'tsv' ? '\t' : ',';

  var records = (0, _core.coerceArray)(result);

  var labels = (0, _core.selectedLabels)(req.query.$select, records[0]);

  var keys = (0, _core.selectedKeys)(req.query.$select, records[0]);

  var output = records.reduce(function (output, record) {
    return [].concat((0, _toConsumableArray3.default)(output), [keys.map(function (key) {

      var value = _lodash2.default.get(record, key);

      if (_lodash2.default.isDate(value)) {

        return (0, _moment2.default)(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
      } else {

        return value;
      }
    }).join(separator)]);
  }, [labels.join(separator)]).join('\n');

  res.status(200).type('text/plain').send(output);
};