'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackframeError = function (_Error) {
  (0, _inherits3.default)(BackframeError, _Error);

  function BackframeError(_ref) {
    var code = _ref.code,
        message = _ref.message,
        errors = _ref.errors;
    (0, _classCallCheck3.default)(this, BackframeError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BackframeError.__proto__ || Object.getPrototypeOf(BackframeError)).call(this, message));

    _this.name = 'BackframeError';
    _this.code = code;
    _this.message = message;
    _this.errors = errors;
    return _this;
  }

  return BackframeError;
}(Error);

exports.default = BackframeError;