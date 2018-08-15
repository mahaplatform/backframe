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

    _this.routes = [];

    if (config.routes) _this.setRoutes(config.routes);
    return _this;
  }

  (0, _createClass3.default)(Segment, [{
    key: 'setRoutes',
    value: function setRoutes(routes) {
      this.routes = routes;
    }
  }, {
    key: 'addRoute',
    value: function addRoute(route) {
      this._addItem('routes', route);
    }
  }, {
    key: 'render',
    value: function render() {
      var segmentPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _this2 = this;

      var segmentOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var segmentHooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


      return this.routes.reduce(function (routes, route) {

        var path = _this2._mergePaths(segmentPath, _this2.path);

        var options = _this2._mergeOptions(segmentOptions, _this2.options);

        var hooks = _this2._mergeHooks(segmentHooks, _this2.hooks);

        return [].concat((0, _toConsumableArray3.default)(routes), (0, _toConsumableArray3.default)(_lodash2.default.castArray(route.render(path, options, hooks))));
      }, []);
    }
  }]);
  return Segment;
}(_component2.default);

exports.default = Segment;