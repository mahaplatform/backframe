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

var _destroy_route = require('./destroy_route');

var _destroy_route2 = _interopRequireDefault(_destroy_route);

var _create_route = require('./create_route');

var _create_route2 = _interopRequireDefault(_create_route);

var _update_route = require('./update_route');

var _update_route2 = _interopRequireDefault(_update_route);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _list_route = require('./list_route');

var _list_route2 = _interopRequireDefault(_list_route);

var _show_route = require('./show_route');

var _show_route2 = _interopRequireDefault(_show_route);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resources = function (_Component) {
  (0, _inherits3.default)(Resources, _Component);

  function Resources() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Resources);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Resources.__proto__ || Object.getPrototypeOf(Resources)).call(this, config));

    _this.collectionActions = [];
    _this.filterParams = [];
    _this.model = null;
    _this.memberActions = [];
    _this.only = null;
    _this.path = null;
    _this.except = null;
    _this.serializer = null;
    _this.sortParams = [];

    if (config.allowedParams) _this.setAllowedParams(config.allowedParams);
    if (config.collectionActions) _this.appendCollectionAction(config.collectionActions);
    if (config.except) _this.setExcept(config.except);
    if (config.filterParams) _this.setFilterParams(config.filterParams);
    if (config.memberActions) _this.appendMemberAction(config.memberActions);
    if (config.model) _this.setModel(config.model);
    if (config.only) _this.setOnly(config.only);
    if (config.path) _this.setPath(config.path);
    if (config.serializer) _this.setSerializer(config.serializer);
    if (config.sortParams) _this.setSortParams(config.sortParams);
    return _this;
  }

  (0, _createClass3.default)(Resources, [{
    key: 'setAllowedParams',
    value: function setAllowedParams(allowedParams) {
      this.allowedParams = allowedParams;
    }
  }, {
    key: 'setExcept',
    value: function setExcept(except) {
      this.except = except;
    }
  }, {
    key: 'setFilterParams',
    value: function setFilterParams(filterParams) {
      this.filterParams = filterParams;
    }
  }, {
    key: 'setModel',
    value: function setModel(model) {
      this.model = model;
    }
  }, {
    key: 'setOnly',
    value: function setOnly(only) {
      this.only = only;
    }
  }, {
    key: 'setPath',
    value: function setPath(path) {
      this.path = path;
    }
  }, {
    key: 'prependPath',
    value: function prependPath(path) {
      this.path = '' + path + this.path;
    }
  }, {
    key: 'setSerializer',
    value: function setSerializer(serializer) {
      this.serializer = serializer;
    }
  }, {
    key: 'setSortParams',
    value: function setSortParams(sortParams) {
      this.sortParams = sortParams;
    }
  }, {
    key: 'appendCollectionAction',
    value: function appendCollectionAction(action) {
      this._appendItem('collectionActions', action);
    }
  }, {
    key: 'prependCollectionAction',
    value: function prependCollectionAction(action) {
      this._prependItem('collectionActions', action);
    }
  }, {
    key: 'appendMemberAction',
    value: function appendMemberAction(action) {
      this._appendItem('memberActions', action);
    }
  }, {
    key: 'prependMemberAction',
    value: function prependMemberAction(action) {
      this._prependItem('memberActions', action);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


      var routes = [];

      if (this._includeAction('list')) routes.push(this._getListRoute());

      if (this._includeAction('create')) routes.push(this._getCreateRoute());

      this.collectionActions.map(function (route) {
        return routes.push(_this2._getCollectionRoute(route));
      });

      if (this._includeAction('show')) routes.push(this._getShowRoute());

      if (this._includeAction('update')) routes.push(this._getUpdateRoute());

      if (this._includeAction('destroy')) routes.push(this._getDestroyRoute());

      this.memberActions.map(function (route) {
        return routes.push(_this2._getMemberRoute(route));
      });

      return routes.map(function (route) {

        if (_this2.path) route.prependPath(_this2.path);

        if (_this2.alterRequest) route.prependAlterRequest(_this2.alterRequest);

        if (_this2.beforeProcessor) route.prependBeforeProcessor(_this2.beforeProcessor);

        if (_this2.afterProcessor) route.prependAfterProcessor(_this2.afterProcessor);

        if (_this2.alterRecord) route.prependAlterRecord(_this2.alterRecord);

        if (_this2.beforeCommit) route.prependBeforeCommit(_this2.beforeCommit);

        if (_this2.afterCommit) route.prependAfterCommit(_this2.afterCommit);

        if (_this2.beforeRollback) route.prependBeforeRollback(_this2.beforeRollback);

        return route.render(options);
      });
    }
  }, {
    key: '_includeAction',
    value: function _includeAction(action) {

      if (this.only && !_lodash2.default.includes(this.only, action)) return false;

      if (this.except && _lodash2.default.includes(this.except, action)) return false;

      return true;
    }
  }, {
    key: '_destructureParam',
    value: function _destructureParam(key, action) {

      if (_lodash2.default.isPlainObject(this[key])) {

        if (this[key][action]) return this[key][action];

        if (this[key].all) return this[key].all;
      }

      return this[key];
    }
  }, {
    key: '_fetchResource',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return options.model.where({
                  id: req.params.id
                }).fetch({
                  transacting: trx
                });

              case 2:
                req.resource = _context.sent;

                if (!req.resource) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', req);

              case 5:
                throw new _error2.default({
                  code: 404,
                  message: 'Unable to load record'
                });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _fetchResource(_x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      }

      return _fetchResource;
    }()
  }, {
    key: '_getListRoute',
    value: function _getListRoute() {
      return new _list_route2.default({
        defaultQuery: this._destructureParam('defaultQuery', 'list'),
        defaultSort: this._destructureParam('defaultSort', 'list'),
        filterParams: this._destructureParam('filterParams', 'list'),
        model: this._destructureParam('model', 'list'),
        serializer: this._destructureParam('serializer', 'list'),
        searchParams: this._destructureParam('searchParams', 'list'),
        sortParams: this._destructureParam('sortParams', 'list'),
        withRelated: this._destructureParam('withRelated', 'list')
      });
    }
  }, {
    key: '_getCreateRoute',
    value: function _getCreateRoute() {
      return new _create_route2.default({
        allowedParams: this._destructureParam('allowedParams', 'create'),
        model: this._destructureParam('model', 'create'),
        serializer: this._destructureParam('serializer', 'create'),
        virtualParams: this._destructureParam('virtualParams', 'create')
      });
    }
  }, {
    key: '_getShowRoute',
    value: function _getShowRoute() {
      return new _show_route2.default({
        alterRequest: this._fetchResource,
        model: this._destructureParam('model', 'show'),
        serializer: this._destructureParam('serializer', 'show')
      });
    }
  }, {
    key: '_getUpdateRoute',
    value: function _getUpdateRoute() {
      return new _update_route2.default({
        alterRequest: this._fetchResource,
        allowedParams: this._destructureParam('allowedParams', 'update'),
        model: this._destructureParam('model', 'update'),
        serializer: this._destructureParam('serializer', 'update'),
        virtualParams: this._destructureParam('virtualParams', 'update')
      });
    }
  }, {
    key: '_getDestroyRoute',
    value: function _getDestroyRoute() {
      return new _destroy_route2.default({
        alterRequest: this._fetchResource,
        model: this._destructureParam('model', 'destroy'),
        serializer: this._destructureParam('serializer', 'destroy')
      });
    }
  }, {
    key: '_getCollectionRoute',
    value: function _getCollectionRoute(route) {
      return route;
    }
  }, {
    key: '_getMemberRoute',
    value: function _getMemberRoute(route) {
      route.prependPath('/:id');
      route.prependAlterRequest(this._fetchResource);
      return route;
    }
  }]);
  return Resources;
}(_component2.default);

exports.default = Resources;