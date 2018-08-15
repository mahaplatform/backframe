'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _bluebird = require('bluebird');

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateRoute = function (_Route) {
  (0, _inherits3.default)(CreateRoute, _Route);

  function CreateRoute() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, CreateRoute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CreateRoute.__proto__ || Object.getPrototypeOf(CreateRoute)).call(this, config));

    _this.setAction('create');
    _this.setMethod('post');
    _this.setPath('');
    _this.setProcessor(_this._processor);
    if (config.allowedParams) _this.setAllowedParams(config.allowedParams);
    if (config.model) _this.setModel(config.model);
    if (config.virtualParams) _this.setVirtualParams(config.virtualParams);
    return _this;
  }

  (0, _createClass3.default)(CreateRoute, [{
    key: 'setAllowedParams',
    value: function setAllowedParams(allowedParams) {
      this._setOption('allowedParams', allowedParams);
    }
  }, {
    key: 'setModel',
    value: function setModel(model) {
      this._setOption('model', model);
    }
  }, {
    key: 'setVirtualParams',
    value: function setVirtualParams(virtualParams) {
      this._setOption('virtualParams', virtualParams);
    }
  }, {
    key: '_processor',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return options.model.forge((0, _extends3.default)({}, this._defaultParams(req, trx, options), this._allowedParams(req.body, options.allowedParams, options.virtualParams))).save(null, {
                  transacting: trx
                });

              case 3:
                req.resource = _context.sent;
                return _context.abrupt('return', req.resource);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                throw new _error2.default({
                  code: 422,
                  message: 'Unable to create record',
                  errors: _context.t0.errors ? _context.t0.toJSON() : _context.t0.message
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function _processor(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return _processor;
    }()
  }, {
    key: '_defaultParams',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, options) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (options.defaultParams) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', {});

              case 2:
                _context3.next = 4;
                return (0, _bluebird.reduce)(options.defaultParams, function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params, defaultParams) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.t0 = _extends3.default;
                            _context2.t1 = {};
                            _context2.t2 = params;
                            _context2.next = 5;
                            return defaultParams(req, trx, options);

                          case 5:
                            _context2.t3 = _context2.sent;
                            return _context2.abrupt('return', (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t3));

                          case 7:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x8, _x9) {
                    return _ref3.apply(this, arguments);
                  };
                }(), {});

              case 4:
                return _context3.abrupt('return', _context3.sent);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _defaultParams(_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      }

      return _defaultParams;
    }()
  }, {
    key: '_allowedParams',
    value: function _allowedParams(body, allowedParams, virtualParams) {

      var allowed = [].concat((0, _toConsumableArray3.default)(_lodash2.default.castArray(allowedParams)), (0, _toConsumableArray3.default)(_lodash2.default.castArray(virtualParams)));

      return _lodash2.default.pick(body, allowed);
    }
  }]);
  return CreateRoute;
}(_route2.default);

exports.default = CreateRoute;