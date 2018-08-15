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

var _route = require('../route');

var _route2 = _interopRequireDefault(_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShowRoute = function (_Route) {
  (0, _inherits3.default)(ShowRoute, _Route);

  function ShowRoute() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, ShowRoute);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ShowRoute.__proto__ || Object.getPrototypeOf(ShowRoute)).call(this, config));

    _this.setAction('show');
    _this.setMethod('get');
    _this.setPath('/:id');
    _this.setProcessor(_this._processor);
    if (config.model) _this.setModel(config.model);
    return _this;
  }

  (0, _createClass3.default)(ShowRoute, [{
    key: 'setModel',
    value: function setModel(model) {
      this._setOption('model', model);
    }
  }, {
    key: '_processor',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', req.resource);

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _processor(_x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return _processor;
    }()
  }]);
  return ShowRoute;
}(_route2.default);

exports.default = ShowRoute;