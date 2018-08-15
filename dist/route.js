'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _error_responder = require('./responders/error_responder');

var _error_responder2 = _interopRequireDefault(_error_responder);

var _json_responder = require('./responders/json_responder');

var _json_responder2 = _interopRequireDefault(_json_responder);

var _xlsx_responder = require('./responders/xlsx_responder');

var _xlsx_responder2 = _interopRequireDefault(_xlsx_responder);

var _csv_responder = require('./responders/csv_responder');

var _csv_responder2 = _interopRequireDefault(_csv_responder);

var _xml_responder = require('./responders/xml_responder');

var _xml_responder2 = _interopRequireDefault(_xml_responder);

var _reporter = require('./reporters/reporter');

var _reporter2 = _interopRequireDefault(_reporter);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Route = function (_Component) {
  (0, _inherits3.default)(Route, _Component);

  function Route() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Route);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Route.__proto__ || Object.getPrototypeOf(Route)).call(this, config));

    _this.action = null;
    _this.method = 'get';
    _this.processor = _lodash2.default.noop;

    if (config.action) _this.setAction(config.action);
    if (config.method) _this.setMethod(config.method);
    if (config.processor) _this.setProcessor(config.processor);
    if (config.serializer) _this.setSerializer(config.serializer);
    return _this;
  }

  (0, _createClass3.default)(Route, [{
    key: 'setAction',
    value: function setAction(action) {
      this.action = action;
    }
  }, {
    key: 'setMethod',
    value: function setMethod(method) {
      this.method = method;
    }
  }, {
    key: 'setProcessor',
    value: function setProcessor(processor) {
      this.processor = processor;
    }
  }, {
    key: 'setSerializer',
    value: function setSerializer(serializer) {
      this._setOption('serializer', serializer);
    }
  }, {
    key: 'render',
    value: function render() {
      var routePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var _this2 = this;

      var routeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var routeHooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


      var path = this._mergePaths(routePath, this.path);

      var options = this._mergeOptions(routeOptions, this.options);

      var hooks = this._mergeHooks(routeHooks, this.hooks);

      var reporter = new _reporter2.default();

      var logger = options.logger ? new options.logger() : new _logger2.default();

      logger.setReporter(reporter);

      var handler = function handler(req, res, next) {

        return options.knex.transaction(function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(trx) {
            var result, renderer, rendered, altered, responder, error_responder;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:

                    logger.init(req, res, trx);

                    _context.prev = 1;
                    _context.next = 4;
                    return _this2._alterRequest(req, trx, options, hooks.alterRequest);

                  case 4:
                    req = _context.sent;
                    _context.next = 7;
                    return _this2._runHooks(req, trx, null, options, hooks.beforeProcessor, false);

                  case 7:
                    _context.next = 9;
                    return _this2.processor(req, trx, options);

                  case 9:
                    _context.t0 = _context.sent;

                    if (_context.t0) {
                      _context.next = 12;
                      break;
                    }

                    _context.t0 = null;

                  case 12:
                    result = _context.t0;
                    _context.next = 15;
                    return _this2._runHooks(req, trx, result, options, hooks.afterProcessor, true);

                  case 15:
                    renderer = new _renderer2.default({ req: req, trx: trx, result: result, options: options });
                    _context.next = 18;
                    return renderer.render();

                  case 18:
                    rendered = _context.sent;
                    _context.next = 21;
                    return _this2._alterRecord(req, trx, rendered, options, hooks.alterRecord);

                  case 21:
                    altered = _context.sent;
                    responder = _this2._getResponder(req, res, altered, options);
                    _context.next = 25;
                    return responder.render();

                  case 25:
                    _context.next = 27;
                    return _this2._runHooks(req, trx, result, options, hooks.beforeCommit, true);

                  case 27:
                    _context.next = 29;
                    return trx.commit(result);

                  case 29:
                    _context.next = 31;
                    return _this2._runHooks(req, trx, result, options, hooks.afterCommit, true);

                  case 31:

                    logger.print();

                    _context.next = 42;
                    break;

                  case 34:
                    _context.prev = 34;
                    _context.t1 = _context['catch'](1);
                    _context.next = 38;
                    return _this2._runHooks(req, trx, null, options, hooks.beforeRollback, false);

                  case 38:
                    error_responder = new _error_responder2.default({ res: res, error: _context.t1 });


                    error_responder.render();

                    _context.next = 42;
                    return trx.rollback(_context.t1);

                  case 42:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2, [[1, 34]]);
          }));

          return function (_x5) {
            return _ref.apply(this, arguments);
          };
        }()).catch(function (error) {

          logger.print();

          if (process.env.NODE_ENV !== 'production') console.log(error);
        });
      };

      return {
        method: this.method,
        path: path.replace(':id', ':id(\\d+)') + '.:format?',
        options: options,
        hooks: hooks,
        handler: handler
      };
    }
  }, {
    key: '_alterRequest',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options, hooks) {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _bluebird.reduce)(hooks, function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, hook) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return hook(req, trx, options);

                          case 2:
                            _context2.t0 = _context2.sent;

                            if (_context2.t0) {
                              _context2.next = 5;
                              break;
                            }

                            _context2.t0 = req;

                          case 5:
                            return _context2.abrupt('return', _context2.t0);

                          case 6:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this3);
                  }));

                  return function (_x10, _x11) {
                    return _ref3.apply(this, arguments);
                  };
                }(), req);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _alterRequest(_x6, _x7, _x8, _x9) {
        return _ref2.apply(this, arguments);
      }

      return _alterRequest;
    }()
  }, {
    key: '_runHooks',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, trx, result, options, hooks, includeResult) {
        var _this4 = this;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _bluebird.mapSeries)(hooks, function () {
                  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(hook) {
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!includeResult) {
                              _context4.next = 4;
                              break;
                            }

                            _context4.next = 3;
                            return hook(req, trx, result, options);

                          case 3:
                            return _context4.abrupt('return', _context4.sent);

                          case 4:
                            _context4.next = 6;
                            return hook(req, trx, options);

                          case 6:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this4);
                  }));

                  return function (_x18) {
                    return _ref5.apply(this, arguments);
                  };
                }());

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _runHooks(_x12, _x13, _x14, _x15, _x16, _x17) {
        return _ref4.apply(this, arguments);
      }

      return _runHooks;
    }()
  }, {
    key: '_alterRecord',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, trx, result, options, hooks) {
        var _this5 = this;

        var alterRecord, records;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                alterRecord = function alterRecord(req, trx, record, options) {
                  return (0, _bluebird.reduce)(hooks, function () {
                    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(record, hook) {
                      return _regenerator2.default.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              _context6.next = 2;
                              return hook(req, trx, record, options);

                            case 2:
                              _context6.t0 = _context6.sent;

                              if (_context6.t0) {
                                _context6.next = 5;
                                break;
                              }

                              _context6.t0 = record;

                            case 5:
                              return _context6.abrupt('return', _context6.t0);

                            case 6:
                            case 'end':
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this5);
                    }));

                    return function (_x24, _x25) {
                      return _ref7.apply(this, arguments);
                    };
                  }(), record);
                };

                if (!(_lodash2.default.isPlainObject(result) && result.records)) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 4;
                return (0, _bluebird.mapSeries)(result.records, function (record) {
                  return alterRecord(req, trx, record, options);
                });

              case 4:
                records = _context7.sent;
                return _context7.abrupt('return', (0, _extends3.default)({}, result, {
                  records: records
                }));

              case 6:
                return _context7.abrupt('return', alterRecord(req, trx, result, options));

              case 7:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _alterRecord(_x19, _x20, _x21, _x22, _x23) {
        return _ref6.apply(this, arguments);
      }

      return _alterRecord;
    }()
  }, {
    key: '_getResponder',
    value: function _getResponder(req, res, result, options) {

      var responderClass = this._getResponderClass(req, options);

      return new responderClass({ req: req, res: res, result: result, options: options });
    }
  }, {
    key: '_getResponderClass',
    value: function _getResponderClass(req, options) {

      var format = req.params && req.params.format ? req.params.format : options.defaultFormat;

      if (_lodash2.default.includes(['xml'], format)) return _xml_responder2.default;

      if (_lodash2.default.includes(['xls', 'xlsx'], format)) return _xlsx_responder2.default;

      if (_lodash2.default.includes(['tsv', 'csv'], format)) return _csv_responder2.default;

      return _json_responder2.default;
    }
  }]);
  return Route;
}(_component2.default);

exports.default = Route;