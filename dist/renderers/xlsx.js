'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _tempfile = require('tempfile');

var _tempfile2 = _interopRequireDefault(_tempfile);

var _exceljs = require('exceljs');

var _exceljs2 = _interopRequireDefault(_exceljs);

var _core = require('../utils/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (pagination, result, req, res, resolve, reject) {

  var records = (0, _core.coerceArray)(result);

  var labels = (0, _core.selectedLabels)(req.query.$select, records[0]);

  var keys = (0, _core.selectedKeys)(req.query.$select, records[0]);

  var workbook = new _exceljs2.default.Workbook();
  var worksheet = workbook.addWorksheet('test');

  worksheet.addRow(labels);

  records.map(function (record) {
    worksheet.addRow(keys.map(function (key) {
      return _lodash2.default.get(record, key);
    }));
  });

  var tempFilePath = (0, _tempfile2.default)('.xlsx');

  return workbook.xlsx.writeFile(tempFilePath).then(function () {

    _fs2.default.readFile(tempFilePath, function (err, data) {

      if (err) reject(err);

      res.send(data);
      resolve();
    });

    return null;
  });
};