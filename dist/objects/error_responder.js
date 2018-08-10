'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _status_codes = require('./status_codes');

var _status_codes2 = _interopRequireDefault(_status_codes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorResponder = function () {
  function ErrorResponder(config) {
    (0, _classCallCheck3.default)(this, ErrorResponder);
    this.res = null;
    this.message = null;

    this.res = config.res;
    this.error = this._getError(config.error);
  }

  (0, _createClass3.default)(ErrorResponder, [{
    key: 'render',
    value: function render() {

      this.res.status(this.error.code).json({
        meta: {
          success: false,
          status: _status_codes2.default[this.error.code],
          message: this.error.message
        },
        errors: this.error.errors
      });
    }
  }, {
    key: '_getError',
    value: function _getError(err) {

      return err.name !== 'BackframeError' ? new _error2.default({
        code: 500,
        message: err.message
      }) : err;
    }
  }]);
  return ErrorResponder;
}();

exports.default = ErrorResponder;