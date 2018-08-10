'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = function (_Component) {
  (0, _inherits3.default)(Plugin, _Component);

  function Plugin() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Plugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, config));

    _this.name = null;

    if (config.name) _this.setName(config.name);
    return _this;
  }

  (0, _createClass3.default)(Plugin, [{
    key: 'setName',
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: 'apply',
    value: function apply(backframe) {

      if (this.alterRequest) backframe.prependAlterRequest(this.alterRequest);

      if (this.beforeProcessor) backframe.prependBeforeProcessor(this.beforeProcessor);

      if (this.afterProcessor) backframe.prependAfterProcessor(this.afterProcessor);

      if (this.alterRecord) backframe.prependAlterRecord(this.alterRecord);

      if (this.beforeCommit) backframe.prependBeforeCommit(this.beforeCommit);

      if (this.afterCommit) backframe.prependAfterCommit(this.afterCommit);

      if (this.beforeRollback) backframe.prependBeforeRollback(this.beforeRollback);
    }
  }]);
  return Plugin;
}(_component2.default);

exports.default = Plugin;