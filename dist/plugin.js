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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Plugin = function (_Component) {
  (0, _inherits3.default)(Plugin, _Component);

  function Plugin() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Plugin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, config));

    _this.name = null;

    if (config.name) _this.setName(config.name);
    if (config.defaultQuery) _this.setDefaultQuery(config.defaultQuery);
    if (config.defaultParams) _this.setDefaultParams(config.defaultParams);
    return _this;
  }

  (0, _createClass3.default)(Plugin, [{
    key: 'setName',
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: 'setDefaultQuery',
    value: function setDefaultQuery(defaultQuery) {
      this._setOption('defaultQuery', _lodash2.default.castArray(defaultQuery));
    }
  }, {
    key: 'setDefaultParams',
    value: function setDefaultParams(defaultParams) {
      this._setOption('defaultParams', _lodash2.default.castArray(defaultParams));
    }
  }, {
    key: 'apply',
    value: function apply(hooks) {

      return this._mergeHooks(hooks, this.hooks);
    }
  }]);
  return Plugin;
}(_component2.default);

exports.default = Plugin;