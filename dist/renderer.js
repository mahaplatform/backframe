'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
                transforms = [this._renderRecord.bind(this)].concat((0, _toConsumableArray3.default)(this.req.query.$select ? [this._selectFields(this.req.query.$select)] : []));

                if (!this.result.records) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return this._applyToRecords(this.req, this.trx, this.result, transforms, this.options);

              case 6:
                return _context.abrupt('return', _context.sent);

              case 7:
                _context.next = 9;
                return this._applyToRecord(this.req, this.trx, this.result, transforms, this.options);

              case 9:
                return _context.abrupt('return', _context.sent);

              case 10:
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
                return (0, _bluebird.mapSeries)(result.records, function () {
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
    key: '_getCacheKey',
    value: function _getCacheKey(req, record) {

      if (!record.get('updated_at')) return null;

      var route = req.path.substr(1).replace(/\//g, '-');

      var timestamp = (0, _moment2.default)(record.get('updated_at')).format('x');

      return route + '-' + timestamp;
    }
  }, {
    key: '_cache',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(key, options, fn) {
        var value, rendered;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!options.cache || !options.redis || !key)) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 3;
                return fn();

              case 3:
                return _context6.abrupt('return', _context6.sent);

              case 4:
                _context6.next = 6;
                return new _bluebird2.default(function (resolve, reject) {

                  options.redis.get(key, function (err, data) {

                    if (err) reject(err);

                    resolve(data);
                  });
                });

              case 6:
                value = _context6.sent;


                console.log(value ? 'hit' : 'miss');

                if (!value) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt('return', JSON.parse(value));

              case 10:
                _context6.next = 12;
                return fn();

              case 12:
                rendered = _context6.sent;
                _context6.next = 15;
                return options.redis.set(key, JSON.stringify(rendered), 'EX', 24 * 60 * 60);

              case 15:
                return _context6.abrupt('return', rendered);

              case 16:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _cache(_x15, _x16, _x17) {
        return _ref6.apply(this, arguments);
      }

      return _cache;
    }()
  }, {
    key: '_renderRecord',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, trx, record, options) {
        var _this3 = this;

        var key, fn;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (record.toJSON) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt('return', record);

              case 2:
                key = this._getCacheKey(req, record);

                fn = function () {
                  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
                    return _regenerator2.default.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (!options.serializer) {
                              _context7.next = 6;
                              break;
                            }

                            _context7.next = 3;
                            return options.serializer(req, trx, record);

                          case 3:
                            _context7.t0 = _context7.sent;
                            _context7.next = 7;
                            break;

                          case 6:
                            _context7.t0 = record.toJSON();

                          case 7:
                            return _context7.abrupt('return', _context7.t0);

                          case 8:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this3);
                  }));

                  return function fn() {
                    return _ref8.apply(this, arguments);
                  };
                }();

                _context8.next = 6;
                return this._cache(key, options, fn);

              case 6:
                return _context8.abrupt('return', _context8.sent);

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _renderRecord(_x18, _x19, _x20, _x21) {
        return _ref7.apply(this, arguments);
      }

      return _renderRecord;
    }()
  }, {
    key: '_selectFields',
    value: function _selectFields(select) {
      var _this4 = this;

      return function (req, trx, record) {

        var fields = _this4._selectedKeys(select, record);

        return select ? _lodash2.default.pick(record, fields) : record;
      };
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
      var _this5 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


      return Object.keys(hash).reduce(function (keys, key) {
        return [].concat((0, _toConsumableArray3.default)(keys), (0, _toConsumableArray3.default)(_lodash2.default.isObject(hash[key]) ? _this5._flattenKeys(hash[key], '' + prefix + key + '.') : ['' + prefix + key]));
      }, []);
    }
  }]);
  return Renderer;
}();

exports.default = Renderer;