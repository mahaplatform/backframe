'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _hooks = require('./utils/hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function () {
  function Component() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Component);
    this.hooks = {};
    this.options = {};
    this.path = '';

    _hooks2.default.map(function (hook) {
      return _this.setHooks(hook, config[hook]);
    });
    if (config.path) this.setPath(config.path);
    this._setOptions(_lodash2.default.omit(config, [].concat((0, _toConsumableArray3.default)(_hooks2.default), ['path'])));
  }

  (0, _createClass3.default)(Component, [{
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: 'setHooks',
    value: function setHooks(name, hook) {
      if (!hook) return;
      this.hooks[name] = [].concat((0, _toConsumableArray3.default)(this.hooks[name] || []), (0, _toConsumableArray3.default)(_lodash2.default.castArray(hook)));
    }
  }, {
    key: 'addHook',
    value: function addHook(ev, hook) {
      this.hooks[ev] = [].concat((0, _toConsumableArray3.default)(this.hooks[ev] || []), (0, _toConsumableArray3.default)(_lodash2.default.castArray(hook)));
    }
  }, {
    key: '_addItem',
    value: function _addItem(type, item) {
      this[type] = [].concat((0, _toConsumableArray3.default)(this[type] || []), (0, _toConsumableArray3.default)(_lodash2.default.castArray(item)));
    }
  }, {
    key: '_setOptions',
    value: function _setOptions(options) {
      var _this2 = this;

      Object.keys(options).map(function (key) {
        _this2._setOption(key, options[key]);
      });
    }
  }, {
    key: '_setOption',
    value: function _setOption(key, value) {
      this.options[key] = value;
    }
  }, {
    key: '_mergePaths',
    value: function _mergePaths() {
      return Array.prototype.slice.call(arguments).reduce(function (full, argument) {
        return '' + full + (argument || '');
      }, '');
    }
  }, {
    key: '_mergeOptions',
    value: function _mergeOptions() {
      var _this3 = this;

      return Array.prototype.slice.call(arguments).reduce(function (full, argument) {
        if (!argument) return full;
        return Object.keys(argument).reduce(function (accumulated, key) {
          return (0, _extends4.default)({}, accumulated, _this3._mergeOption(key, accumulated[key], argument[key]));
        }, full);
      }, {});
    }
  }, {
    key: '_mergeOption',
    value: function _mergeOption(key, accumulated, value) {
      if (!accumulated && !value) return {};
      var append = ['defaultQuery'];
      if (!_lodash2.default.includes(append, key)) return (0, _defineProperty3.default)({}, key, value || accumulated);
      return (0, _defineProperty3.default)({}, key, [].concat((0, _toConsumableArray3.default)(accumulated || []), (0, _toConsumableArray3.default)(value || [])));
    }
  }, {
    key: '_mergeHooks',
    value: function _mergeHooks() {
      var _arguments = arguments;

      return _hooks2.default.reduce(function (hooks, hook) {
        return (0, _extends4.default)({}, hooks, (0, _defineProperty3.default)({}, hook, Array.prototype.slice.call(_arguments).reduce(function (full, argument) {
          return [].concat((0, _toConsumableArray3.default)(full), (0, _toConsumableArray3.default)(argument[hook] || []));
        }, [])));
      }, {});
    }
  }]);
  return Component;
}();

exports.default = Component;