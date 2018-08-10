'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _error_responder = require('./error_responder');

var _error_responder2 = _interopRequireDefault(_error_responder);

var _json_responder = require('./json_responder');

var _json_responder2 = _interopRequireDefault(_json_responder);

var _xlsx_responder = require('./xlsx_responder');

var _xlsx_responder2 = _interopRequireDefault(_xlsx_responder);

var _csv_responder = require('./csv_responder');

var _csv_responder2 = _interopRequireDefault(_csv_responder);

var _xml_responder = require('./xml_responder');

var _xml_responder2 = _interopRequireDefault(_xml_responder);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = function (_Component) {
  (0, _inherits3.default)(Route, _Component);

  function Route() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Route);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this, config));

    _this.method = 'get';
    _this.path = '';

    _this.processor = function () {};

    _this.routeOptions = {};

    if (config.method) _this.setMethod(config.method);
    if (config.path) _this.setPath(config.path);
    if (config.processor) _this.setProcessor(config.processor);
    return _this;
  }

  (0, _createClass3.default)(Route, [{
    key: 'setMethod',
    value: function setMethod(method) {
      this.method = method;
    }
  }, {
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: 'prependPath',
    value: function prependPath(path) {
      this.path = '' + path + this.path;
    }
  }, {
    key: 'setProcessor',
    value: function setProcessor(processor) {
      this.processor = processor;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var routeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      var options = (0, _extends3.default)({}, this.routeOptions, routeOptions);

      var logger = options.logger ? new options.logger() : new _logger2.default();

      return {

        method: this.method,

        path: this.path.replace(':id', ':id(\\d+)') + '.:format?',

        handler: function handler(req, res, next) {

          return options.knex.transaction(function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(trx) {
              var result, renderer, rendered, responder, error_responder;
              return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:

                      logger.init(req, res, trx);

                      _context8.next = 3;
                      return (0, _bluebird.reduce)(_this2.alterRequest, function () {
                        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, hook) {
                          return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return hook(req, trx, options);

                                case 2:
                                  return _context.abrupt('return', _context.sent);

                                case 3:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          }, _callee, _this2);
                        }));

                        return function (_x4, _x5) {
                          return _ref2.apply(this, arguments);
                        };
                      }(), req);

                    case 3:
                      _context8.prev = 3;
                      _context8.next = 6;
                      return (0, _bluebird.reduce)(_this2.alterRequest, function () {
                        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, hook) {
                          return _regenerator2.default.wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return hook(req, trx, options);

                                case 2:
                                  return _context2.abrupt('return', _context2.sent);

                                case 3:
                                case 'end':
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, _this2);
                        }));

                        return function (_x6, _x7) {
                          return _ref3.apply(this, arguments);
                        };
                      }(), req);

                    case 6:
                      req = _context8.sent;
                      _context8.next = 9;
                      return (0, _bluebird.mapSeries)(_this2.beforeProcessor, function () {
                        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(hook) {
                          return _regenerator2.default.wrap(function _callee3$(_context3) {
                            while (1) {
                              switch (_context3.prev = _context3.next) {
                                case 0:
                                  _context3.next = 2;
                                  return hook(req, trx, options);

                                case 2:
                                case 'end':
                                  return _context3.stop();
                              }
                            }
                          }, _callee3, _this2);
                        }));

                        return function (_x8) {
                          return _ref4.apply(this, arguments);
                        };
                      }());

                    case 9:
                      _context8.next = 11;
                      return _this2.processor(req, trx, options);

                    case 11:
                      _context8.t0 = _context8.sent;

                      if (_context8.t0) {
                        _context8.next = 14;
                        break;
                      }

                      _context8.t0 = null;

                    case 14:
                      result = _context8.t0;
                      _context8.next = 17;
                      return (0, _bluebird.reduce)(_this2.afterProcessor, function () {
                        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(result, hook) {
                          return _regenerator2.default.wrap(function _callee4$(_context4) {
                            while (1) {
                              switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return hook(req, trx, result, options);

                                case 2:
                                  return _context4.abrupt('return', _context4.sent);

                                case 3:
                                case 'end':
                                  return _context4.stop();
                              }
                            }
                          }, _callee4, _this2);
                        }));

                        return function (_x9, _x10) {
                          return _ref5.apply(this, arguments);
                        };
                      }(), result);

                    case 17:
                      result = _context8.sent;
                      renderer = new _renderer2.default({ req: req, trx: trx, result: result, options: options });
                      _context8.next = 21;
                      return renderer.render();

                    case 21:
                      rendered = _context8.sent;
                      responder = _this2._getResponder(req, res, options, rendered);
                      _context8.next = 25;
                      return responder.render();

                    case 25:
                      _context8.next = 27;
                      return (0, _bluebird.mapSeries)(_this2.beforeCommit, function () {
                        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(hook) {
                          return _regenerator2.default.wrap(function _callee5$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return hook(req, trx, options);

                                case 2:
                                case 'end':
                                  return _context5.stop();
                              }
                            }
                          }, _callee5, _this2);
                        }));

                        return function (_x11) {
                          return _ref6.apply(this, arguments);
                        };
                      }());

                    case 27:
                      _context8.next = 29;
                      return trx.commit(result);

                    case 29:
                      _context8.next = 31;
                      return (0, _bluebird.mapSeries)(_this2.afterCommit, function () {
                        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(hook) {
                          return _regenerator2.default.wrap(function _callee6$(_context6) {
                            while (1) {
                              switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return hook(req, trx, options);

                                case 2:
                                case 'end':
                                  return _context6.stop();
                              }
                            }
                          }, _callee6, _this2);
                        }));

                        return function (_x12) {
                          return _ref7.apply(this, arguments);
                        };
                      }());

                    case 31:

                      logger.print();

                      _context8.next = 42;
                      break;

                    case 34:
                      _context8.prev = 34;
                      _context8.t1 = _context8['catch'](3);
                      _context8.next = 38;
                      return (0, _bluebird.mapSeries)(_this2.beforeRollback, function () {
                        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(hook) {
                          return _regenerator2.default.wrap(function _callee7$(_context7) {
                            while (1) {
                              switch (_context7.prev = _context7.next) {
                                case 0:
                                  _context7.next = 2;
                                  return hook(req, trx, options);

                                case 2:
                                case 'end':
                                  return _context7.stop();
                              }
                            }
                          }, _callee7, _this2);
                        }));

                        return function (_x13) {
                          return _ref8.apply(this, arguments);
                        };
                      }());

                    case 38:
                      error_responder = new _error_responder2.default({ res: res, error: _context8.t1 });


                      error_responder.render();

                      _context8.next = 42;
                      return trx.rollback(_context8.t1);

                    case 42:
                    case 'end':
                      return _context8.stop();
                  }
                }
              }, _callee8, _this2, [[3, 34]]);
            }));

            return function (_x3) {
              return _ref.apply(this, arguments);
            };
          }()).catch(function (error) {

            logger.print();

            if (process.env.NODE_ENV !== 'production') console.log(error);
          });
        }

      };
    }
  }, {
    key: '_setRouteParams',
    value: function _setRouteParams(key, value) {
      this.routeOptions[key] = this[key] = value;
    }
  }, {
    key: '_responderName',
    value: function _responderName(req, options) {

      var format = req.params && req.params.format ? req.params.format : options.defaultFormat;

      if (!_lodash2.default.includes(['csv', 'tsv', 'xlsx', 'xml', 'json'], format)) return 'JsonResponder';

      return _lodash2.default.capitalize(format) + 'Responder';
    }
  }, {
    key: '_getResponder',
    value: function _getResponder(req, res, options, rendered) {

      var responderName = this._responderName(req, options);

      var responders = { CsvResponder: _csv_responder2.default, JsonResponder: _json_responder2.default, TsvResponder: _csv_responder2.default, XlsxResponder: _xlsx_responder2.default, XmlResponder: _xml_responder2.default };

      var responderClass = options[responderName] || responders[responderName];

      return new responderClass({ req: req, res: res, options: options, rendered: rendered });
    }
  }]);
  return Route;
}(_component2.default);

exports.default = Route;