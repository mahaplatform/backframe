'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = function () {
  function Logger() {
    (0, _classCallCheck3.default)(this, Logger);
    this.req = null;
    this.res = null;
    this.trx = null;
    this.log = null;
    this.reporter = null;
    this.startTime = null;
  }

  (0, _createClass3.default)(Logger, [{
    key: 'init',
    value: function init(req, res, trx) {
      this.req = req;
      this.res = res;
      this.trx = trx;
      this.log = [];
      this.startTime = process.hrtime();
      this.trx.on('query', this._startQuery.bind(this));
      this.trx.on('query-response', this._endQuery.bind(this));
    }
  }, {
    key: 'setReporter',
    value: function setReporter(reporter) {
      this.reporter = reporter;
    }
  }, {
    key: 'print',
    value: function print() {

      var diff = process.hrtime(this.startTime);

      var data = {
        duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3),
        hostname: this.req.hostname,
        method: this.req.method.toUpperCase(),
        url: this.req.originalUrl.match(/^([^?]*)(.*)?$/)[1],
        status: this.res.statusCode,
        params: this.req.params,
        query: this.req.query,
        body: this.req.body,
        log: this.log
      };

      this.reporter.render(data);
    }
  }, {
    key: '_startQuery',
    value: function _startQuery(query) {

      if (!query.__knexQueryUid) return;

      this.log.push({
        uid: query.__knexQueryUid,
        sql: query.sql,
        bindings: query.bindings,
        startTime: process.hrtime()
      });
    }
  }, {
    key: '_endQuery',
    value: function _endQuery(response, query) {

      if (!query.__knexQueryUid) return;

      var index = _lodash2.default.findIndex(this.log, { uid: query.__knexQueryUid });

      var diff = process.hrtime(this.log[index].startTime);

      this.log[index] = {
        sql: this.log[index].sql,
        bindings: this.log[index].bindings,
        duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3)
      };
    }
  }]);
  return Logger;
}();

exports.default = Logger;