'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('./services/environment');

var _backframe = require('backframe');

var _user_serializer = require('./serializers/user_serializer');

var _user_serializer2 = _interopRequireDefault(_user_serializer);

var _knex = require('./services/knex');

var _knex2 = _interopRequireDefault(_knex);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticator = new _backframe.Plugin({
  name: 'authenticator',
  alterRequest: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, trx, options) {
      var _req$headers$authoriz, _req$headers$authoriz2, id, user;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (options.authenticated) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              if (req.headers.authorization) {
                _context.next = 4;
                break;
              }

              throw new _backframe.BackframeError({
                code: 401,
                message: 'Unauthenticated request'
              });

            case 4:
              _req$headers$authoriz = req.headers.authorization.match(/Bearer (.*)/), _req$headers$authoriz2 = (0, _slicedToArray3.default)(_req$headers$authoriz, 2), id = _req$headers$authoriz2[1];
              _context.next = 7;
              return _user2.default.where({ id: id }).fetch({
                transacting: trx
              });

            case 7:
              user = _context.sent;

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function alterRequest(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()
});

var activate = new _backframe.Route({
  method: 'patch',
  path: '/activate',
  processor: function processor(req, trx) {
    return 'route2';
  }
});

var users = new _backframe.Resources({
  authenticated: {
    list: true,
    all: false
  },
  allowedParams: ['first_name', 'last_name', 'email', 'created_at'],
  filterParams: ['id', 'first_name', 'last_name', 'email', 'created_at'],
  model: _user2.default,
  path: '/users',
  memberActions: [activate],
  serializer: _user_serializer2.default,
  sortParams: ['id', 'first_name', 'last_name', 'email'],
  withRelated: ['photo']
});

var user = new _backframe.Resource({
  allowedParams: ['first_name', 'last_name', 'email', 'created_at'],
  model: _user2.default,
  path: '/user',
  actions: [activate],
  serializer: _user_serializer2.default
});

var nestedRoute1 = new _backframe.Route();
nestedRoute1.setMethod('get');
nestedRoute1.setPath('/three');
nestedRoute1.setProcessor(function (req, trx, options) {
  return {
    records: ['one', 'two', 'three']
  };
});

var nestedRoute2 = new _backframe.Route();
nestedRoute2.setMethod('get');
nestedRoute2.setPath('/four');
nestedRoute2.setProcessor(function (req, trx, options) {
  return 'one';
});

var nestedSegment2 = new _backframe.Segment();
nestedSegment2.setPath('/two');
nestedSegment2.addRoute([nestedRoute1, nestedRoute2]);

var nestedSegment1 = new _backframe.Segment();
nestedSegment1.setPath('/one');
nestedSegment1.addRoute(nestedSegment2);

var authenticated = new _backframe.Segment({
  routes: [users, user, nestedSegment1]
});

var api = new _backframe.Backframe({
  knex: _knex2.default,
  path: '/api',
  plugins: [authenticator],
  routes: [authenticated]
});

var routes = api.render();

var transport = new _backframe.ExpressTransport(routes);

transport.listen(3000, function () {

  console.log('Listening on 3000');
});