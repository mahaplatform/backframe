'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

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
    return _this;
  }

  (0, _createClass3.default)(DestroyRoute, [{
    key: 'setModel',
    value: function setModel(model) {
      this._setRouteParams('model', model);
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
                frozen = (0, _extends3.default)({}, req.resource.attributes);

                if (options.dependents) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this._destroyRelated(options, req.resource, trx);

              case 5:
                _context.next = 7;
                return this._destroyResource(options, req.resource, trx);

              case 7:
                return _context.abrupt('return', {
                  toJSON: function toJSON() {
                    return frozen;
                  },
                  get: function get(value) {
                    return frozen[value];
                  }
                });

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](0);
                throw new _error2.default({
                  code: 422,
                  message: 'Unable to destroy record',
                  errors: _context.t0.errors ? _context.t0.toJSON() : _context.t0.message
                });

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function _processor(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return _processor;
    }()
  }, {
    key: '_destroyRelated',
    value: function _destroyRelated() {}
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