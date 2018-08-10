'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _responder = require('./responder');

var _responder2 = _interopRequireDefault(_responder);

var _tempfile = require('tempfile');

var _tempfile2 = _interopRequireDefault(_tempfile);

var _exceljs = require('exceljs');

var _exceljs2 = _interopRequireDefault(_exceljs);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XlsxResponder = function (_Responder) {
  (0, _inherits3.default)(XlsxResponder, _Responder);

  function XlsxResponder() {
    (0, _classCallCheck3.default)(this, XlsxResponder);
    return (0, _possibleConstructorReturn3.default)(this, (XlsxResponder.__proto__ || Object.getPrototypeOf(XlsxResponder)).apply(this, arguments));
  }

  (0, _createClass3.default)(XlsxResponder, [{
    key: 'render',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var records, labels, keys, workbook, worksheet, tempFilePath, data, filename, datestamp;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                records = _lodash2.default.castArray(this.data);
                labels = this._selectedLabels(this.req.query.$select, records[0]);
                keys = this._selectedKeys(this.req.query.$select, records[0]);
                workbook = new _exceljs2.default.Workbook();
                worksheet = workbook.addWorksheet('test');


                worksheet.addRow(labels);

                records.map(function (record) {
                  return worksheet.addRow(keys.map(function (key) {

                    return _lodash2.default.get(record, key);
                  }));
                });

                tempFilePath = (0, _tempfile2.default)('.xlsx');
                _context.next = 10;
                return workbook.xlsx.writeFile(tempFilePath);

              case 10:
                data = _fs2.default.readFileSync(tempFilePath);


                if (this.req.query.download) {
                  filename = this.req.query.filename || 'export';
                  datestamp = (0, _moment2.default)().format('YYYYMMDDHHmm');


                  this.res.setHeader('Content-disposition', 'attachment; filename=' + filename + '-' + datestamp + '.xlsx');
                }

                this.res.status(200).type('application/vnd.ms-excel').send(data);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _ref.apply(this, arguments);
      }

      return render;
    }()
  }]);
  return XlsxResponder;
}(_responder2.default);

exports.default = XlsxResponder;