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

var _not_found_route = require('./not_found_route');

var _not_found_route2 = _interopRequireDefault(_not_found_route);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Backframe = function (_Component) {
  (0, _inherits3.default)(Backframe, _Component);

  function Backframe() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Backframe);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Backframe.__proto__ || Object.getPrototypeOf(Backframe)).call(this, config));

    _this.defaultFormat = 'json';
    _this.defaultLimit = 100;
    _this.knex = null;
    _this.logger = null;
    _this.plugins = [];
    _this.redis = null;
    _this.reorter = null;
    _this.routes = [];

    if (config.defaultFormat) _this.setDefaultFormat(config.defaultFormat);
    if (config.defaultLimit) _this.setDefaultLimit(config.defaultLimit);
    if (config.knex) _this.setKnex(config.knex);
    if (config.logger) _this.setLogger(config.logger);
    if (config.plugins) _this.setPlugins(config.plugins);
    if (config.redis) _this.setRedis(config.redis);
    if (config.routes) _this.setRoutes(config.routes);
    if (config.reporter) _this.setReporter(config.reporter);
    return _this;
  }

  (0, _createClass3.default)(Backframe, [{
    key: 'setDefaultFormat',
    value: function setDefaultFormat(defaultFormat) {
      this.defaultFormat = defaultFormat;
    }
  }, {
    key: 'setDefaultLimit',
    value: function setDefaultLimit(defaultLimit) {
      this.defaultLimit = defaultLimit;
    }
  }, {
    key: 'setKnex',
    value: function setKnex(knex) {
      this.knex = knex;
    }
  }, {
    key: 'setLogger',
    value: function setLogger(logger) {
      this.logger = logger;
    }
  }, {
    key: 'setPlugins',
    value: function setPlugins(plugins) {
      this.plugins = plugins;
    }
  }, {
    key: 'setRedis',
    value: function setRedis(redis) {
      this.redis = redis;
    }
  }, {
    key: 'addPlugin',
    value: function addPlugin(plugin) {
      this._addItem('plugins', plugin);
    }
  }, {
    key: 'setReporter',
    value: function setReporter(reporter) {
      this.reporter = reporter;
    }
  }, {
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
      var _this2 = this;

      var hooks = this.plugins.reduce(function (hooks, plugin) {

        return plugin.apply(hooks);
      }, this.hooks);

      var backframeOptions = {
        defaultFormat: this.defaultFormat,
        defaultLimit: this.defaultLimit,
        knex: this.knex,
        logger: this.logger,
        redis: this.redis
      };

      var options = this._mergeOptions(backframeOptions, this.customOptions);

      return [].concat((0, _toConsumableArray3.default)(this.routes.reduce(function (routes, route) {
        return [].concat((0, _toConsumableArray3.default)(routes), (0, _toConsumableArray3.default)(_lodash2.default.castArray(route.render(_this2.path, options, hooks))));
      }, [])), [_not_found_route2.default.render('', options)]);
    }
  }]);
  return Backframe;
}(_component2.default);

exports.default = Backframe;