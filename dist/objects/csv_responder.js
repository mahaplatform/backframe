'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CsvResponder = function (_Responder) {
  (0, _inherits3.default)(CsvResponder, _Responder);

  function CsvResponder() {
    (0, _classCallCheck3.default)(this, CsvResponder);
    return (0, _possibleConstructorReturn3.default)(this, (CsvResponder.__proto__ || Object.getPrototypeOf(CsvResponder)).apply(this, arguments));
  }

  (0, _createClass3.default)(CsvResponder, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var separator = this._getSeparator();

      var enclosure = this._getEnclosure();

      var records = _lodash2.default.castArray(this.data);

      var matrix = _lodash2.default.isPlainObject(records[0]) ? this._toMatrix(records) : records;

      var wrapped = matrix.map(function (row) {
        return row.map(function (col) {
          return _this2._wrapWithEnclosure(col, enclosure);
        });
      });

      var output = wrapped.map(function (row) {
        return row.join(separator);
      }).join('\r\n');

      if (this.req.query.download) {

        var filename = this.req.query.filename || 'export';

        var datestamp = (0, _moment2.default)().format('YYYYMMDDHHmm');

        var ext = this.req.params.format === 'tsv' ? 'tsv' : 'csv';

        res.setHeader('Content-disposition', 'attachment; filename=' + filename + '-' + datestamp + '.' + ext);
      }

      this.res.status(200).type('text/plain').send(output);
    }
  }, {
    key: '_getSeparator',
    value: function _getSeparator() {

      if (this.req.query.separator) {

        if (this.req.query.separator === 'tab') return '\t';

        return this.req.query.separator;
      }

      if (this.req.params.format === 'tsv') return '\t';

      return ',';
    }
  }, {
    key: '_getEnclosure',
    value: function _getEnclosure() {

      if (this.req.query.enclosure) return this.req.query.enclosure;

      return '';
    }
  }, {
    key: '_toMatrix',
    value: function _toMatrix(records) {

      var labels = this._selectedLabels(this.req.query.$select, records[0]);

      var keys = this._selectedKeys(this.req.query.$select, records[0]);

      return records.reduce(function (output, record) {
        return [].concat((0, _toConsumableArray3.default)(output), [keys.map(function (key) {

          var value = _lodash2.default.get(record, key);

          if (_lodash2.default.isDate(value)) return (0, _moment2.default)(value).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';

          return value;
        })]);
      }, [labels]);
    }
  }, {
    key: '_wrapWithEnclosure',
    value: function _wrapWithEnclosure(value, enclosure) {
      return enclosure + value + enclosure;
    }
  }]);
  return CsvResponder;
}(_responder2.default);

exports.default = CsvResponder;