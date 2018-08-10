'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExpressTransport = function () {
  function ExpressTransport(routes) {
    (0, _classCallCheck3.default)(this, ExpressTransport);
    this.routes = null;


    this.routes = routes;
  }

  (0, _createClass3.default)(ExpressTransport, [{
    key: 'listen',
    value: function listen(port, callback) {

      var server = (0, _express2.default)();

      server.set('query parser', function (str) {
        return _qs2.default.parse(str, { arrayLimit: 100 });
      });

      server.use(_bodyParser2.default.urlencoded({ extended: true, limit: '5mb' }));

      server.use(_bodyParser2.default.json({ limit: '5mb' }));

      this.routes.map(function (route) {

        server[route.method](route.path, route.handler);
      });

      server.listen(port, callback);
    }
  }]);
  return ExpressTransport;
}();

exports.default = ExpressTransport;