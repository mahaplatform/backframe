'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var Collection = function (_Component) {
  (0, _inherits3.default)(Collection, _Component);

  function Collection() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Collection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, config));

    _this.allowedParams = null;
    _this.except = null;
    _this.model = null;
    _this.only = null;
    _this.serializer = null;
    _this.virtualParams = null;
    _this.withRelated = null;

    if (config.allowedParams) _this.setAllowedParams(config.allowedParams);
    if (config.except) _this.setExcept(config.except);
    if (config.model) _this.setModel(config.model);
    if (config.only) _this.setOnly(config.only);
    if (config.serializer) _this.setSerializer(config.serializer);
    if (config.virtualParams) _this.setAllowedParams(config.virtualParams);
    if (config.withRelated) _this.setWithRelated(config.withRelated);
    return _this;
  }

  (0, _createClass3.default)(Collection, [{
    key: 'setAllowedParams',
    value: function setAllowedParams(params) {
      this.allowedParams = _lodash2.default.castArray(params);
    }
  }, {
    key: 'setExcept',
    value: function setExcept(except) {
      this.except = except;
    }
  }, {
    key: 'setModel',
    value: function setModel(model) {
      this.model = model;
    }
  }, {
    key: 'setOnly',
    value: function setOnly(only) {
      this.only = only;
    }
  }, {
    key: 'setSerializer',
    value: function setSerializer(serializer) {
      this.serializer = serializer;
    }
  }, {
    key: 'setVirtualParams',
    value: function setVirtualParams(params) {
      this.allowedParams = _lodash2.default.castArray(params);
    }
  }, {
    key: 'setWithRelated',
    value: function setWithRelated(withRelated) {
      this.withRelated = withRelated;
    }
  }, {
    key: '_includeAction',
    value: function _includeAction(action) {

      if (this.only && !_lodash2.default.includes(this.only, action)) return false;

      if (this.except && _lodash2.default.includes(this.except, action)) return false;

      return true;
    }
  }, {
    key: '_getDestructuredOptions',
    value: function _getDestructuredOptions(options, action) {
      var _this2 = this;

      return Object.keys(options).reduce(function (destructured, option) {

        var value = _this2._getDestructuredOption(options, option, action);

        return (0, _extends3.default)({}, destructured, value ? (0, _defineProperty3.default)({}, option, value) : {});
      }, {});
    }
  }, {
    key: '_getDestructuredOption',
    value: function _getDestructuredOption(options, option, action) {

      if (_lodash2.default.isPlainObject(options[option])) {

        if (options[option][action]) return options[option][action];

        if (options[option].all) return options[option].all;

        var defaultActions = ['all', 'list', 'create', 'show', 'update', 'destroy'];

        if (_lodash2.default.intersection(defaultActions, Object.keys(options[option])).length > 0) return null;
      }

      return options[option];
    }
  }]);
  return Collection;
}(_component2.default);

exports.default = Collection;