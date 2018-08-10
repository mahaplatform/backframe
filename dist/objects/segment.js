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


      return this.routes.map(function (route) {

        if (_this2.path) route.prependPath(_this2.path);

        if (_this2.beforeProcessor) route.prependBeforeProcessor(_this2.beforeProcessor);

        if (_this2.afterProcessor) route.prependAfterProcessor(_this2.afterProcessor);

        return route.render((0, _extends3.default)({}, options));
      });
    }
  }]);
  return Segment;
}(_component2.default);

exports.default = Segment;