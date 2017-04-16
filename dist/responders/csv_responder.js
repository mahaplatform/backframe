'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _core = require('../utils/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (message, pagination, result, req, res, resolve, reject) {

  var separator = req.params.format === 'tsv' ? '\t' : ',';

  var records = (0, _core.coerceArray)(result);

  var labels = (0, _core.selectedLabels)(req.query.$select, records[0]);

  var keys = (0, _core.selectedKeys)(req.query.$select, records[0]);

  var output = records.reduce(function (output, record) {
    return [].concat(_toConsumableArray(output), [keys.map(function (key) {

      var value = _lodash2.default.get(record, key);

      if (_lodash2.default.isDate(value)) {

        return (0, _moment2.default)(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
      } else {

        return value;
      }
    }).join(separator)]);
  }, [labels.join(separator)]).join('\n');

  res.status(200).type('text/plain').send(output);

  resolve();
};