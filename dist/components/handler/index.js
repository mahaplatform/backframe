'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runHooks = exports.runAlterRecord = exports.runAlterRequest = exports.buildHandler = exports.expandLifecycle = exports.normalizeOptions = undefined;

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../../utils');

var _options = require('../../utils/options');

var _core = require('../../utils/core');

var _constants = require('../../constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var backframeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  return function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var TYPES = {
      after: { type: ['function', 'function[]'], required: false },
      alterRequest: { type: ['function', 'function[]'], required: false },
      alterRecord: { type: ['function', 'function[]'], required: false },
      before: { type: ['function', 'function[]'], required: false },
      csvResponder: { type: ['function'], required: false },
      jsonResponder: { type: ['function'], required: false },
      processor: { type: 'function', required: true },
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

  return expandLifecycle((0, _extends4.default)({}, (0, _options.defaultOptions)(types), {
    responder: (0, _utils.defaultResponder)('Success')(userOptions)
  }, backframeOptions, userOptions));
};

var expandLifecycle = exports.expandLifecycle = function expandLifecycle(userOptions) {

  return constants.BACKFRAME_HOOKS.reduce(function (options, hook) {
    return (0, _extends4.default)({}, options, (0, _defineProperty3.default)({}, hook, (0, _core.coerceArray)(userOptions[hook])));
  }, userOptions);
};

var buildHandler = exports.buildHandler = function buildHandler(options) {
  var alterRequest = options.alterRequest,
      before = options.before,
      processor = options.processor,
      after = options.after,
      renderer = options.renderer,
      alterRecord = options.alterRecord,
      responder = options.responder;


  return function (req, res) {
    var recordTick = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


    return options.bookshelf.transaction(function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(trx) {
        var result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return runAlterRequest(req, trx, alterRequest);

              case 2:
                req = _context.sent;


                recordTick('alterRequest');

                _context.next = 6;
                return runHooks(req, trx, before);

              case 6:

                recordTick('before');

                _context.next = 9;
                return processor(req, trx);

              case 9:
                result = _context.sent;


                recordTick('processor');

                _context.next = 13;
                return runHooks(req, trx, after, result);

              case 13:

                recordTick('after');

                if (!renderer) {
                  _context.next = 20;
                  break;
                }

                _context.next = 17;
                return renderer(req, trx, result);

              case 17:
                _context.t0 = _context.sent;
                _context.next = 21;
                break;

              case 20:
                _context.t0 = result;

              case 21:
                result = _context.t0;


                recordTick('renderer');

                _context.next = 25;
                return runAlterRecord(req, trx, alterRecord, result);

              case 25:
                result = _context.sent;


                recordTick('alterRecord');

                _context.next = 29;
                return responder(req, res, result);

              case 29:

                recordTick('responder');

                return _context.abrupt('return', result);

              case 31:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x4) {
        return _ref.apply(this, arguments);
      };
    }());
  };
};

var runAlterRequest = exports.runAlterRequest = function runAlterRequest(req, trx, alterRequest) {

  var runner = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, operation) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return operation(req, trx);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function runner(_x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  if (alterRequest.length === 0) req;

  if (alterRequest.length === 1) return runner(req, alterRequest[0]);

  return (0, _bluebird.reduce)(alterRequest, runner, req);
};

var runAlterRecord = exports.runAlterRecord = function runAlterRecord(req, trx, alterRecord, result) {

  var runner = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(result, operation) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return result && result.records;

            case 2:
              if (!_context3.sent) {
                _context3.next = 6;
                break;
              }

              _context3.t0 = (0, _core.applyToRecords)(req, trx, result, operation);
              _context3.next = 7;
              break;

            case 6:
              _context3.t0 = operation(req, trx, result);

            case 7:
              return _context3.abrupt('return', _context3.t0);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function runner(_x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }();

  if (alterRecord.length === 0) return result;

  if (alterRecord.length === 1) return runner(result, alterRecord[0]);

  return (0, _bluebird.reduce)(alterRecord, runner, result);
};

var runHooks = exports.runHooks = function runHooks(req, trx, hooks) {
  var result = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


  var runner = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(hook) {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return result;

            case 2:
              if (!_context4.sent) {
                _context4.next = 6;
                break;
              }

              _context4.t0 = hook(req, trx, result);
              _context4.next = 7;
              break;

            case 6:
              _context4.t0 = hook(req, trx);

            case 7:
              return _context4.abrupt('return', _context4.t0);

            case 8:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function runner(_x10) {
      return _ref4.apply(this, arguments);
    };
  }();

  if (hooks.length === 0) return null;

  if (hooks.length === 1) return runner(hooks[0]);

  return (0, _bluebird.map)(hooks, function (hook) {
    return runner(hook);
  });
};