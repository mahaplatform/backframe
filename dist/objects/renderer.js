'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Renderer = function () {
  function Renderer() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Renderer);
    this.req = null;
    this.result = null;
    this.trx = null;
    this.options = null;

    this.req = config.req;
    this.result = config.result;
    this.trx = config.trx;
    this.options = config.options;
  }

  (0, _createClass3.default)(Renderer, [{
    key: 'render',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var transforms;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.result) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', null);

              case 2:
                transforms = [this._renderRecord].concat((0, _toConsumableArray3.default)(this.req.query.$select ? [this._selectFields(this.req.query.$select)] : []));

                if (!this.result.records) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return this._applyToRecords(this.req, this.trx, this.result, transforms, this.options);

              case 6:
                return _context.abrupt('return', _context.sent);

              case 7:

                console.log(this.result);

                _context.next = 10;
                return this._applyToRecord(this.req, this.trx, this.result, transforms, this.options);

              case 10:
                return _context.abrupt('return', _context.sent);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _ref.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: '_applyToRecords',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, trx, result, operations, options) {
        var _this = this;

        var records;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (operations) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', result);

              case 2:
                _context3.next = 4;
                return (0, _bluebird.map)(result.records, function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(record) {
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _this._applyToRecord(req, trx, record, operations, options);

                          case 2:
                            return _context2.abrupt('return', _context2.sent);

                          case 3:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this);
                  }));

                  return function (_x7) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 4:
                records = _context3.sent;
                return _context3.abrupt('return', (0, _extends3.default)({}, result, {
                  records: records
                }));

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _applyToRecords(_x2, _x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
      }

      return _applyToRecords;
    }()
  }, {
    key: '_applyToRecord',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, trx, record, operations, options) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _bluebird.reduce)(_lodash2.default.castArray(operations), function () {
                  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(record, operation) {
                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return operation(req, trx, record, options);

                          case 2:
                            return _context4.abrupt('return', _context4.sent);

                          case 3:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this2);
                  }));

                  return function (_x13, _x14) {
                    return _ref5.apply(this, arguments);
                  };
                }(), record);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _applyToRecord(_x8, _x9, _x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
      }

      return _applyToRecord;
    }()
  }, {
    key: '_renderRecord',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, trx, result, options) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(_lodash2.default.isPlainObject(result) || _lodash2.default.isNil(options.serializer))) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt('return', result.toJSON());

              case 2:
                _context6.next = 4;
                return options.serializer(req, trx, result);

              case 4:
                return _context6.abrupt('return', _context6.sent);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _renderRecord(_x15, _x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
      }

      return _renderRecord;
    }()
  }, {
    key: '_selectFields',
    value: function _selectFields(select) {

      return function (req, trx, record) {

        var fields = selectedKeys(select, record);

        return select ? _lodash2.default.pick(record, fields) : record;
      };
    }
  }]);
  return Renderer;
}();

exports.default = Renderer;