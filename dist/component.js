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

var _reserved = require('./utils/reserved');

var _reserved2 = _interopRequireDefault(_reserved);

var _hooks = require('./utils/hooks');

var _hooks2 = _interopRequireDefault(_hooks);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function () {
  function Component() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Component);
    this.hooks = {
      afterCommit: [],
      afterProcessor: [],
      alterRecord: [],
      alterRequest: [],
      beforeCommit: [],
      beforeProcessor: [],
      beforeRollback: []
    };
    this.customOptions = null;
    this.path = null;

    if (config.afterCommit) this.setHooks('afterCommit', config.afterCommit);
    if (config.afterProcessor) this.setHooks('afterProcessor', config.afterProcessor);
    if (config.alterRecord) this.setHooks('alterRecord', config.alterRecord);
    if (config.alterRequest) this.setHooks('alterRequest', config.alterRequest);
    if (config.beforeCommit) this.setHooks('beforeCommit', config.beforeCommit);
    if (config.beforeProcessor) this.setHooks('beforeProcessor', config.beforeProcessor);
    if (config.beforeRollback) this.setHooks('beforeRollback', config.beforeRollback);
    if (config.path) this.setPath(config.path);
    this._setCustomOptions(config);
  }

  (0, _createClass3.default)(Component, [{
    key: 'setHooks',
    value: function setHooks(ev, hooks) {
      this.hooks[ev] = _lodash2.default.castArray(hooks);
    }
  }, {
    key: 'addHook',
    value: function addHook(ev, hook) {
      this.hooks[ev] = [].concat((0, _toConsumableArray3.default)(this.hooks[ev] || []), (0, _toConsumableArray3.default)(_lodash2.default.castArray(hook)));
    }
  }, {
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: '_addItem',
    value: function _addItem(type, item) {
      this[type] = [].concat((0, _toConsumableArray3.default)(this[type] || []), (0, _toConsumableArray3.default)(_lodash2.default.castArray(item)));
    }
  }, {
    key: '_setCustomOptions',
    value: function _setCustomOptions(options) {
      this.customOptions = (0, _extends4.default)({}, this.customOptions || {}, _lodash2.default.omit(options, _reserved2.default));
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
      return Array.prototype.slice.call(arguments).reduce(function (full, argument) {
        return (0, _extends4.default)({}, full, argument || {});
      }, {});
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