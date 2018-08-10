'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _status_codes = require('../utils/status_codes');

var _status_codes2 = _interopRequireDefault(_status_codes);

var _responder = require('./responder');

var _responder2 = _interopRequireDefault(_responder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonResponder = function (_Responder) {
  (0, _inherits3.default)(JsonResponder, _Responder);

  function JsonResponder() {
    (0, _classCallCheck3.default)(this, JsonResponder);
    return (0, _possibleConstructorReturn3.default)(this, (JsonResponder.__proto__ || Object.getPrototypeOf(JsonResponder)).apply(this, arguments));
  }

  (0, _createClass3.default)(JsonResponder, [{
    key: 'render',
    value: function render() {

      this.res.status(200).send((0, _extends3.default)({
        meta: {
          success: true,
          status: _status_codes2.default[200],
          message: 'Success'
        }
      }, this.pagination ? { pagination: this.pagination } : {}, {
        data: this.data
      }));
    }
  }]);
  return JsonResponder;
}(_responder2.default);

exports.default = JsonResponder;