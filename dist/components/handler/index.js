'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderError = exports.runResponder = exports.runHooks = exports.runAlterRecord = exports.runAlterRequest = exports.buildHandler = exports.expandLifecycle = exports.normalizeOptions = undefined;

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _options = require('../../utils/options');

var _core = require('../../utils/core');

var _utils = require('../../utils');

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

var _response = require('../../utils/response');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {
      afterCommit: { type: ['function', 'function[]'], required: false },
      afterProcessor: { type: ['function', 'function[]'], required: false },
      alterRequest: { type: ['function', 'function[]'], required: false },
      alterRecord: { type: ['function', 'function[]'], required: false },
      beforeProcessor: { type: ['function', 'function[]'], required: false },
      beforeRollback: { type: ['function', 'function[]'], required: false },
      csvResponder: { type: ['function'], required: false },
      jsonResponder: { type: ['function'], required: false },
      handler: { type: 'function', required: false },
      processor: { type: 'function', required: false },
      renderer: { type: 'function', required: false },
      responder: { type: 'function', required: false },
      tsvResponder: { type: ['function'], required: false },
      xlsxResponder: { type: ['function'], required: false },
      xmlResponder: { type: ['function'], required: false }
    };

    (0, _options.validateOptions)('handler', userOptions, TYPES);

    var options = normalizeOptions(userOptions, backframeOptions, TYPES);

    return buildHandler(options);
  };
};

var normalizeOptions = exports.normalizeOptions = function normalizeOptions(userOptions, backframeOptions, types) {

  return expandLifecycle((0, _extends4.default)({}, (0, _options.defaultOptions)(types), backframeOptions, userOptions));
};

var expandLifecycle = exports.expandLifecycle = function expandLifecycle(userOptions) {

  return constants.BACKFRAME_HOOKS.reduce(function (options, hook) {
    return (0, _extends4.default)({}, options, (0, _defineProperty3.default)({}, hook, (0, _core.coerceArray)(userOptions[hook])));
  }, userOptions);
};

var buildHandler = exports.buildHandler = function buildHandler(options) {

  return function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(process.env.NODE_ENV === 'test')) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return withTransaction(req, res, null, options);

            case 3:
              return _context2.abrupt('return', _context2.sent);

            case 4:
              _context2.next = 6;
              return options.knex.transaction(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(trx) {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return withTransaction(req, res, trx, options);

                        case 2:
                          return _context.abrupt('return', _context.sent);

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x5) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 6:
              return _context2.abrupt('return', _context2.sent);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
};

var withTransaction = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, trx, options) {
    var alterRequest, beforeProcessor, processor, afterProcessor, renderer, alterRecord, responder, afterCommit, beforeRollback, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            alterRequest = options.alterRequest, beforeProcessor = options.beforeProcessor, processor = options.processor, afterProcessor = options.afterProcessor, renderer = options.renderer, alterRecord = options.alterRecord, responder = options.responder, afterCommit = options.afterCommit, beforeRollback = options.beforeRollback;
            _context3.prev = 1;
            _context3.next = 4;
            return runAlterRequest(req, trx, options, alterRequest);

          case 4:
            _context3.t0 = _context3.sent;

            if (_context3.t0) {
              _context3.next = 7;
              break;
            }

            _context3.t0 = req;

          case 7:
            req = _context3.t0;
            _context3.next = 10;
            return runHooks(req, trx, options, beforeProcessor, false);

          case 10:
            _context3.next = 12;
            return processor(req, trx, options);

          case 12:
            _context3.t1 = _context3.sent;

            if (_context3.t1) {
              _context3.next = 15;
              break;
            }

            _context3.t1 = null;

          case 15:
            result = _context3.t1;
            _context3.next = 18;
            return runHooks(req, trx, options, afterProcessor, result);

          case 18:
            if (!renderer) {
              _context3.next = 24;
              break;
            }

            _context3.next = 21;
            return renderer(req, trx, result, options);

          case 21:
            _context3.t2 = _context3.sent;
            _context3.next = 25;
            break;

          case 24:
            _context3.t2 = result;

          case 25:
            result = _context3.t2;
            _context3.next = 28;
            return runAlterRecord(req, trx, options, alterRecord, result);

          case 28:
            _context3.t3 = _context3.sent;

            if (_context3.t3) {
              _context3.next = 31;
              break;
            }

            _context3.t3 = result;

          case 31:
            result = _context3.t3;
            _context3.next = 34;
            return runResponder(req, res, options, result, responder);

          case 34:
            if (!trx) {
              _context3.next = 37;
              break;
            }

            _context3.next = 37;
            return trx.commit(result);

          case 37:
            _context3.next = 39;
            return runHooks(req, trx, options, afterCommit, result);

          case 39:
            return _context3.abrupt('return', result);

          case 42:
            _context3.prev = 42;
            _context3.t4 = _context3['catch'](1);


            console.error(_context3.t4.stack);

            _context3.next = 47;
            return runHooks(req, trx, options, beforeRollback);

          case 47:
            if (!trx) {
              _context3.next = 50;
              break;
            }

            _context3.next = 50;
            return trx.rollback(_context3.t4);

          case 50:
            return _context3.abrupt('return', renderError(res, _context3.t4));

          case 51:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 42]]);
  }));

  return function withTransaction(_x6, _x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var runAlterRequest = exports.runAlterRequest = function runAlterRequest(req, trx, options, alterRequest) {

  var runner = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, operation) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return operation(req, trx, options);

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function runner(_x10, _x11) {
      return _ref4.apply(this, arguments);
    };
  }();

  if (alterRequest.length === 0) req;

  if (alterRequest.length === 1) return runner(req, alterRequest[0]);

  return (0, _bluebird.reduce)(alterRequest, runner, req);
};

var runAlterRecord = exports.runAlterRecord = function runAlterRecord(req, trx, options, alterRecord, result) {

  if (!alterRecord) return result;

  var runner = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(result, operation) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(result && result.records)) {
                _context5.next = 6;
                break;
              }

              _context5.next = 3;
              return (0, _core.applyToRecords)(req, trx, result, operation, options);

            case 3:
              _context5.t0 = _context5.sent;
              _context5.next = 9;
              break;

            case 6:
              _context5.next = 8;
              return operation(req, trx, result, options);

            case 8:
              _context5.t0 = _context5.sent;

            case 9:
              return _context5.abrupt('return', _context5.t0);

            case 10:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function runner(_x12, _x13) {
      return _ref5.apply(this, arguments);
    };
  }();

  if (alterRecord.length === 0) return result;

  if (alterRecord.length === 1) return runner(result, alterRecord[0]);

  return (0, _bluebird.reduce)(alterRecord, runner, result);
};

var runHooks = exports.runHooks = function runHooks(req, trx, options, hooks, result) {

  if (!hooks) return true;

  var runner = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(hook) {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return result;

            case 2:
              _context6.t0 = _context6.sent;

              if (!(_context6.t0 === false)) {
                _context6.next = 7;
                break;
              }

              _context6.t1 = hook(req, trx, options);
              _context6.next = 8;
              break;

            case 7:
              _context6.t1 = hook(req, trx, result, options);

            case 8:
              return _context6.abrupt('return', _context6.t1);

            case 9:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function runner(_x14) {
      return _ref6.apply(this, arguments);
    };
  }();

  if (hooks.length === 0) return null;

  if (hooks.length === 1) return runner(hooks[0]);

  return (0, _bluebird.map)(hooks, function (hook) {
    return runner(hook);
  });
};

var runResponder = exports.runResponder = function runResponder(req, res, options, result, responder) {

  if (responder) responder(req, res, result, options);
};

var renderError = exports.renderError = function renderError(res, err) {

  if (err.name == 'BackframeError') return (0, _response.fail)(res, err.code, err.message, { errors: err.errors });

  (0, _response.fail)(res, 500, err.message);

  return err;
};