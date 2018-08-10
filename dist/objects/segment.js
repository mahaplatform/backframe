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

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Segment = function (_Component) {
  (0, _inherits3.default)(Segment, _Component);

  function Segment() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Segment);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this, config));

    _this.path = null;
    _this.routes = [];

    if (config.path) _this.setPath(config.path);
    if (config.routes) _this.appendRoute(config.routes);
    return _this;
  }

  (0, _createClass3.default)(Segment, [{
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: 'prependPath',
    value: function prependPath(path) {
      this.path = '' + path + this.path;
    }
  }, {
    key: 'appendRoute',
    value: function appendRoute(route) {
      this._appendItem('routes', route);
    }
  }, {
    key: 'prependRoute',
    value: function prependRoute(route) {
      this._prependItem('routes', route);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      return this.routes.reduce(function (routes, route) {

        if (_this2.path) route.prependPath(_this2.path);

        if (_this2.alterRequest) route.prependAlterRequest(_this2.alterRequest);

        if (_this2.beforeProcessor) route.prependBeforeProcessor(_this2.beforeProcessor);

        if (_this2.afterProcessor) route.prependAfterProcessor(_this2.afterProcessor);

        if (_this2.alterRecord) route.prependAlterRecord(_this2.alterRecord);

        if (_this2.beforeCommit) route.prependBeforeCommit(_this2.beforeCommit);

        if (_this2.afterCommit) route.prependAfterCommit(_this2.afterCommit);

        if (_this2.beforeRollback) route.prependBeforeRollback(_this2.beforeRollback);

        return [].concat((0, _toConsumableArray3.default)(routes), (0, _toConsumableArray3.default)(_lodash2.default.castArray(route.render(options))));
      }, []);
    }
  }]);
  return Segment;
}(_component2.default);

exports.default = Segment;