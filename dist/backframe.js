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

var _not_found_route = require('./routes/not_found_route');

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
    _this.path = null;
    _this.plugins = [];
    _this.routes = [];

    if (config.defaultFormat) _this.setDefaultFormat(config.defaultFormat);
    if (config.defaultLimit) _this.setDefaultLimit(config.defaultLimit);
    if (config.knex) _this.setKnex(config.knex);
    if (config.logger) _this.setLogger(config.logger);
    if (config.path) _this.setPath(config.path);
    if (config.plugins) _this.appendPlugin(config.plugins);
    if (config.routes) _this.appendRoute(config.routes);
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
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: 'setPlugins',
    value: function setPlugins(plugins) {
      this.plugins = plugins;
    }
  }, {
    key: 'appendPlugin',
    value: function appendPlugin(plugin) {
      this._appendItem('plugins', plugin);
    }
  }, {
    key: 'prependPlugin',
    value: function prependPlugin(plugin) {
      this._prependItem('plugins', plugin);
    }
  }, {
    key: 'setRoutes',
    value: function setRoutes(routes) {
      this.routes = routes;
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

      this.plugins.map(function (plugin) {

        plugin.apply(_this2);
      });

      var options = {
        knex: this.knex,
        logger: this.logger,
        defaultFormat: this.defaultFormat,
        defaultLimit: this.defaultLimit
      };

      return [].concat((0, _toConsumableArray3.default)(this.routes.reduce(function (routes, route) {

        if (_this2.path) route.prependPath(_this2.path);

        if (_this2.alterRequest) route.prependAlterRequest(_this2.alterRequest);

        if (_this2.beforeProcessor) route.prependBeforeProcessor(_this2.beforeProcessor);

        if (_this2.afterProcessor) route.prependAfterProcessor(_this2.afterProcessor);

        if (_this2.alterRecord) route.prependAlterRecord(_this2.alterRecord);

        if (_this2.beforeCommit) route.prependBeforeCommit(_this2.beforeCommit);

        if (_this2.afterCommit) route.prependAfterCommit(_this2.afterCommit);

        if (_this2.beforeRollback) route.prependBeforeRollback(_this2.beforeRollback);

        return [].concat((0, _toConsumableArray3.default)(routes), (0, _toConsumableArray3.default)(_lodash2.default.castArray(route.render(options))));
      }, [])), [_not_found_route2.default.render(options)]);
    }
  }]);
  return Backframe;
}(_component2.default);

exports.default = Backframe;