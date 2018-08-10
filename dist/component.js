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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function () {
  function Component() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Component);
    this.alterRequest = [];
    this.beforeProcessor = [];
    this.afterProcessor = [];
    this.alterRecord = [];
    this.beforeCommit = [];
    this.afterCommit = [];
    this.beforeRollback = [];

    if (config.alterRequest) this.appendAlterRequest(config.alterRequest);
    if (config.beforeProcessor) this.appendBeforeProcessor(config.beforeProcessor);
    if (config.afterProcessor) this.appendAfterProcessor(config.afterProcessor);
    if (config.alterRecord) this.appendAlterRecord(config.alterRecord);
    if (config.beforeCommit) this.appendBeforeCommit(config.beforeCommit);
    if (config.afterCommit) this.appendAfterCommit(config.afterCommit);
    if (config.beforeRollback) this.appendBeforeRollback(config.beforeRollback);
  }

  (0, _createClass3.default)(Component, [{
    key: 'appendAlterRequest',
    value: function appendAlterRequest(hook) {
      this._appendItem('alterRequest', hook);
    }
  }, {
    key: 'prependAlterRequest',
    value: function prependAlterRequest(hook) {
      this._prependItem('alterRequest', hook);
    }
  }, {
    key: 'appendBeforeProcessor',
    value: function appendBeforeProcessor(hook) {
      this._appendItem('beforeProcessor', hook);
    }
  }, {
    key: 'prependBeforeProcessor',
    value: function prependBeforeProcessor(hook) {
      this._prependItem('beforeProcessor', hook);
    }
  }, {
    key: 'appendAfterProcessor',
    value: function appendAfterProcessor(hook) {
      this._appendItem('afterProcessor', hook);
    }
  }, {
    key: 'prependAfterProcessor',
    value: function prependAfterProcessor(hook) {
      this._prependItem('afterProcessor', hook);
    }
  }, {
    key: 'appendAlterRecord',
    value: function appendAlterRecord(hook) {
      this._appendItem('alterRecord', hook);
    }
  }, {
    key: 'prependAlterRecord',
    value: function prependAlterRecord(hook) {
      this._prependItem('alterRecord', hook);
    }
  }, {
    key: 'appendBeforeCommit',
    value: function appendBeforeCommit(hook) {
      this._appendItem('beforeCommit', hook);
    }
  }, {
    key: 'prependBeforeCommit',
    value: function prependBeforeCommit(hook) {
      this._prependItem('beforeCommit', hook);
    }
  }, {
    key: 'appendAfterCommit',
    value: function appendAfterCommit(hook) {
      this._appendItem('afterCommit', hook);
    }
  }, {
    key: 'prependAfterCommit',
    value: function prependAfterCommit(hook) {
      this._prependItem('afterCommit', hook);
    }
  }, {
    key: 'appendBeforeRollback',
    value: function appendBeforeRollback(hook) {
      this._appendItem('beforeRollback', hook);
    }
  }, {
    key: 'prependBeforeRollback',
    value: function prependBeforeRollback(hook) {
      this._prependItem('beforeRollback', hook);
    }
  }, {
    key: '_appendItem',
    value: function _appendItem(type, item) {
      this[type] = [].concat((0, _toConsumableArray3.default)(this[type]), (0, _toConsumableArray3.default)(_lodash2.default.castArray(item)));
    }
  }, {
    key: '_prependItem',
    value: function _prependItem(type, item) {
      this[type] = [].concat((0, _toConsumableArray3.default)(_lodash2.default.castArray(item)), (0, _toConsumableArray3.default)(this[type]));
    }
  }]);
  return Component;
}();

exports.default = Component;