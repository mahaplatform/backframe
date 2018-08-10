'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reporter = function () {
  function Reporter() {
    (0, _classCallCheck3.default)(this, Reporter);
  }

  (0, _createClass3.default)(Reporter, [{
    key: 'render',
    value: function render(data) {
      this._writeKeyValue('REQUEST', data.method + ' ' + data.url);
      this._writeKeyValue('HOST', data.hostname);
      if (!_lodash2.default.isEmpty(data.params)) this._writeKeyValue('PARAMS', JSON.stringify(data.params));
      if (!_lodash2.default.isEmpty(data.query)) this._writeKeyValue('QUERY', JSON.stringify(data.query));
      if (!_lodash2.default.isEmpty(data.body)) this._writeKeyValue('BODY', JSON.stringify(data.body));
      this._writeKeyValue('RESPONSE', data.status + ' in ' + data.duration + ' ms');
      data.log.map(function (entry) {
        process.stdout.write(_chalk2.default.green('SQL: ') + _chalk2.default.hex('#DDDDDD')(entry.sql) + _chalk2.default.magenta(' {' + entry.bindings.join(', ') + '} ') + entry.duration + 'ms\n');
      });
      process.stdout.write('\n');
    }
  }, {
    key: '_writeKeyValue',
    value: function _writeKeyValue(key, value) {
      process.stdout.write(_chalk2.default.red(_lodash2.default.padEnd(key + ': ', 10)) + _chalk2.default.white(value) + '\n');
    }
  }]);
  return Reporter;
}();

exports.default = Reporter;