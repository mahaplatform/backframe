'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DestroyRoute = function (_Route) {
  (0, _inherits3.default)(DestroyRoute, _Route);

  function DestroyRoute() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, DestroyRoute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DestroyRoute.__proto__ || Object.getPrototypeOf(DestroyRoute)).call(this, config));

    _this.setAction('destroy');
    _this.setMethod('delete');
    _this.setPath('/:id');
    _this.setProcessor(_this._processor);
    if (config.model) _this.setModel(config.model);
    if (config.primaryKey) _this.setPrimaryKey(config.primaryKey);
    return _this;
  }

  (0, _createClass3.default)(DestroyRoute, [{
    key: 'setModel',
    value: function setModel(model) {
      this._setOption('model', model);
    }
  }, {
    key: 'setPrimaryKey',
    value: function setPrimaryKey(primaryKey) {
      this._setOption('primaryKey', primaryKey);
    }
  }, {
    key: '_processor',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
        var frozen;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return options.model.where({
                  id: req.params.id
                }).fetch({
                  transacting: trx,
                  withRelated: options.withRelated ? _lodash2.default.castArray(options.withRelated) : []
                });

              case 3:
                frozen = _context.sent;

                if (!options.dependents) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return this._destroyRelated(req, trx, options);

              case 7:
                _context.next = 9;
                return this._destroyResource(options, req.resource, trx);

              case 9:
                return _context.abrupt('return', frozen);

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](0);
                throw new _error2.default({
                  code: 422,
                  message: 'Unable to destroy record',
                  errors: _context.t0.errors ? _context.t0.toJSON() : _context.t0.message
                });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 12]]);
      }));

      function _processor(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return _processor;
    }()
  }, {
    key: '_destroyRelated',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, trx, options) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _bluebird.map)(options.dependents, function () {
                  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dependent) {
                    var results;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return req.resource.load([dependent.relationship], { transacting: trx });

                          case 2:
                            results = req.resource.related(dependent.relationship);

                            if (!(results.length === 0)) {
                              _context3.next = 5;
                              break;
                            }

                            return _context3.abrupt('return');

                          case 5:
                            _context3.next = 7;
                            return (0, _bluebird.map)(results.toArray(), function () {
                              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(record) {
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        if (!(dependent.strategy === 'destroy')) {
                                          _context2.next = 4;
                                          break;
                                        }

                                        _context2.next = 3;
                                        return record.destroy({ transacting: trx });

                                      case 3:
                                        return _context2.abrupt('return', _context2.sent);

                                      case 4:
                                        _context2.next = 6;
                                        return record.save((0, _defineProperty3.default)({}, dependent.foreignKey, null), { patch: true, transacting: trx });

                                      case 6:
                                      case 'end':
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2, _this2);
                              }));

                              return function (_x9) {
                                return _ref4.apply(this, arguments);
                              };
                            }());

                          case 7:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x8) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _destroyRelated(_x5, _x6, _x7) {
        return _ref2.apply(this, arguments);
      }

      return _destroyRelated;
    }()
  }, {
    key: '_destroyResource',
    value: function _destroyResource(options, resource, trx) {

      if (!options.softDelete) return resource.destroy({ transacting: trx });

      return resource.save({
        deleted_at: (0, _moment2.default)()
      }, {
        patch: true,
        transacting: trx
      });
    }
  }]);
  return DestroyRoute;
}(_route2.default);

exports.default = DestroyRoute;