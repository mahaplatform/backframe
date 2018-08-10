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

var Responder = function () {
  function Responder() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Responder);
    this.req = null;
    this.res = null;
    this.options = null;
    this.pagination = null;
    this.data = null;

    this.req = config.req;
    this.res = config.res;
    this.options = config.options;
    this.pagination = this._getPagination(config.result);
    this.data = this._getData(config.result);
  }

  (0, _createClass3.default)(Responder, [{
    key: '_getPagination',
    value: function _getPagination(result) {

      if (!result || _lodash2.default.get(result, 'records')) return null;

      if (result.next !== undefined) return _lodash2.default.pick(result, ['next', 'skip']);

      if (result.all !== undefined) return _lodash2.default.pick(result, ['all', 'total', 'limit', 'skip']);

      return null;
    }
  }, {
    key: '_getData',
    value: function _getData(result) {

      if (!result) return result;

      if (_lodash2.default.get(result, 'records')) return result.records;

      return result;
    }
  }, {
    key: '_selectedLabels',
    value: function _selectedLabels(select, record) {

      if (_lodash2.default.isPlainObject(select)) return Object.keys(select);

      if (_lodash2.default.isNil(select)) return this._flattenKeys(record);

      return _lodash2.default.castArray(select);
    }
  }, {
    key: '_selectedKeys',
    value: function _selectedKeys(select, record) {

      if (_lodash2.default.isPlainObject(select)) return Object.values(select);

      if (_lodash2.default.isNil(select)) return this._flattenKeys(record);

      return _lodash2.default.castArray(select);
    }
  }, {
    key: '_flattenKeys',
    value: function _flattenKeys(hash) {
      var _this = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


      return Object.keys(hash).reduce(function (keys, key) {
        return [].concat((0, _toConsumableArray3.default)(keys), (0, _toConsumableArray3.default)(_lodash2.default.isObject(hash[key]) ? _this._flattenKeys(hash[key], '' + prefix + key + '.') : ['' + prefix + key]));
      }, []);
    }
  }]);
  return Responder;
}();

exports.default = Responder;