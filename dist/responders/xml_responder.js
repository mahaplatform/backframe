'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _xml = require('xml');

var _xml2 = _interopRequireDefault(_xml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XmlResponder = function (_Responder) {
  (0, _inherits3.default)(XmlResponder, _Responder);

  function XmlResponder() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, XmlResponder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = XmlResponder.__proto__ || Object.getPrototypeOf(XmlResponder)).call.apply(_ref, [this].concat(args))), _this), _this._toXML = function (hash) {
      return Object.keys(hash).map(function (key) {

        var value = hash[key];

        return (0, _defineProperty3.default)({}, key, _lodash2.default.isPlainObject(value) ? _this._toXML(value) : value);
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(XmlResponder, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var paginationSegment = this.pagination ? {
        pagination: [{ all: this.pagination.all }, { total: this.pagination.total }, { limit: this.pagination.limit }, { skip: this.pagination.skip }]
      } : null;

      this.res.status(200).type('application/xml').send((0, _xml2.default)({
        response: [{
          data: _lodash2.default.castArray(this.data).map(function (record) {
            return {
              record: _this2._toXML(record)
            };
          })
        }].concat((0, _toConsumableArray3.default)(paginationSegment || []))
      }, true));
    }
  }]);
  return XmlResponder;
}(_responder2.default);

exports.default = XmlResponder;