'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateRoute = function (_Route) {
  (0, _inherits3.default)(UpdateRoute, _Route);

  function UpdateRoute() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, UpdateRoute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UpdateRoute.__proto__ || Object.getPrototypeOf(UpdateRoute)).call(this, config));

    _this.setAction('update');
    _this.setMethod('patch');
    _this.setPath('');
    _this.setProcessor(_this._processor);
    if (config.allowedParams) _this.setAllowedParams(config.allowedParams);
    if (config.model) _this.setModel(config.model);
    if (config.virtualParams) _this.setVirtualParams(config.virtualParams);
    return _this;
  }

  (0, _createClass3.default)(UpdateRoute, [{
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
        var params;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                params = this._allowedParams(req.body, options.allowedParams);
                _context.next = 4;
                return req.resource.save(params, {
                  patch: true,
                  transacting: trx
                });

              case 4:
                return _context.abrupt('return', req.resource);

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                throw new _error2.default({
                  code: 422,
                  message: 'Unable to update record',
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
    key: '_allowedParams',
    value: function _allowedParams(body, allowedParams) {

      var allowed = _lodash2.default.castArray(allowedParams);

      return _lodash2.default.pick(body, allowed);
    }
  }]);
  return UpdateRoute;
}(_route2.default);

exports.default = UpdateRoute;