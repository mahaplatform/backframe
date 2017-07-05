'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _bluebird = require('bluebird');

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildHandler = require('../index').default({
  knex: {
    transaction: function transaction(cb) {
      return cb({
        commit: function commit(result) {
          return (0, _bluebird.resolve)(result);
        },
        rollback: function rollback() {}
      });
    }
  }
});

var res = {
  status: function status(code) {
    return {
      json: function json(_json) {}
    };
  }
};

exports.default = function () {

  // it('requires a processor', (done) => {
  //
  //   try {
  //     buildHandler({})
  //   } catch(e) {
  //     done()
  //   }
  //
  // })

  it('executes with only a processor', function (done) {

    var handler = buildHandler({
      processor: function processor(req, trx) {
        return 'foo';
      }
    });

    handler({}, res).then(function (result) {
      (0, _chai.expect)(result).to.equal('foo');
      done();
    });
  });

  it('succeeds with a single alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: function alterRequest(req, trx) {
        done();return 'foo';
      },
      processor: function processor(req, trx) {
        return '';
      }
    });

    handler({}, res);
  });

  it('succeeds with multiple alterRequest hooks', function (done) {

    var handler = buildHandler({
      alterRequest: [function (req, trx) {
        return req;
      }, function (req, trx) {
        done();return req;
      }],
      processor: function processor(req, trx) {
        return '';
      }
    });

    handler({}, res);
  });

  it('fails with a failed alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: function alterRequest(req, trx) {
        throw new Error();
      },
      processor: function processor(req, trx) {
        return '';
      }
    });

    handler({}, res).then(function (result) {
      (0, _chai.expect)(result instanceof Error).to.be.true;
      done();
    });
  });

  it('alters the request with alterRequest hook', function (done) {

    var handler = buildHandler({
      alterRequest: [function (req, trx) {
        return (0, _extends3.default)({}, req, {
          bar: 2
        });
      }, function (req, trx) {
        return (0, _extends3.default)({}, req, {
          baz: 3
        });
      }],
      processor: function processor(req, trx) {
        (0, _chai.expect)(req).to.eql({
          foo: 1,
          bar: 2,
          baz: 3
        });
        done();
      }
    });

    handler({ foo: 1 }, res);
  });

  it('succeeds with a single beforeProcessor hook', function (done) {
    return testSingleHookBeforeProcessor('beforeProcessor', done);
  });

  it('succeeds with multiple beforeProcessor hooks', function (done) {
    return testMultipleHooksBeforeProcessor('beforeProcessor', done);
  });

  it('fails with a failed beforeProcessor hook', function (done) {
    return testFailedHookBeforeProcessor('beforeProcessor', done);
  });

  it('succeeds with a single afterProcessor hook', function (done) {
    return testSingleHookAfterProcessor('afterProcessor', done);
  });

  it('succeeds with multiple afterProcessor hooks', function (done) {
    return testMultipleHooksAfterProcessor('afterProcessor', done);
  });

  it('fails with a failed afterProcessor hook', function (done) {
    return testFailedHookAfterProcessor('afterProcessor', done);
  });

  it('succeeds with a single afterCommit hook', function (done) {
    return testSingleHookAfterProcessor('afterCommit', done);
  });

  it('succeeds with multiple afterCommit hooks', function (done) {
    return testMultipleHooksAfterProcessor('afterCommit', done);
  });

  it('fails with a failed afterCommit hook', function (done) {
    return testFailedHookAfterProcessor('afterCommit', done);
  });

  it('succeeds with a single alterRecord hook', function (done) {

    var handler = buildHandler({
      processor: function processor(req, trx) {
        return '';
      },
      alterRecord: function alterRecord(req, trx, result) {
        return done();
      }
    });

    handler({}, res);
  });

  it('succeeds with multiple alterRecord hooks', function (done) {

    var handler = buildHandler({
      processor: function processor(req, trx) {
        return '';
      },
      alterRecord: [function (req, trx, result) {
        return '';
      }, function (req, trx, result) {
        return done();
      }]
    });

    handler({}, res);
  });

  it('fails with a failed alterRecord hook', function (done) {

    var handler = buildHandler({
      processor: function processor(req, trx, result) {
        return 'null';
      },
      alterRecord: function alterRecord(req, trx, result) {
        throw new Error();
      }
    });

    handler({}, res).then(function (result) {
      (0, _chai.expect)(result instanceof Error).to.be.true;
      done();
    });
  });
};

var testSingleHookBeforeProcessor = function testSingleHookBeforeProcessor(key, done) {
  var _buildHandler;

  var handler = buildHandler((_buildHandler = {}, (0, _defineProperty3.default)(_buildHandler, key, function (req, trx) {
    return done();
  }), (0, _defineProperty3.default)(_buildHandler, 'processor', function processor(req, trx) {
    return 'foo';
  }), _buildHandler));

  handler({}, res);
};

var testMultipleHooksBeforeProcessor = function testMultipleHooksBeforeProcessor(key, done) {
  var _buildHandler2;

  var handler = buildHandler((_buildHandler2 = {}, (0, _defineProperty3.default)(_buildHandler2, key, [function (req, trx) {
    return '';
  }, function (req, trx) {
    return '';
  }, function (req, trx) {
    return done();
  }]), (0, _defineProperty3.default)(_buildHandler2, 'processor', function processor(req, trx) {
    return 'foo';
  }), _buildHandler2));

  handler({}, res);
};

var testFailedHookBeforeProcessor = function testFailedHookBeforeProcessor(key, done) {
  var _buildHandler3;

  var handler = buildHandler((_buildHandler3 = {}, (0, _defineProperty3.default)(_buildHandler3, key, function (req, trx, result) {
    throw new Error();
  }), (0, _defineProperty3.default)(_buildHandler3, 'processor', function processor(req, trx) {
    return 'foo';
  }), _buildHandler3));

  handler({}, res).then(function (result) {
    (0, _chai.expect)(result instanceof Error).to.be.true;
    done();
  });
};

var testSingleHookAfterProcessor = function testSingleHookAfterProcessor(key, done) {
  var _buildHandler4;

  var handler = buildHandler((_buildHandler4 = {}, (0, _defineProperty3.default)(_buildHandler4, key, function (req, trx, result) {
    return done();
  }), (0, _defineProperty3.default)(_buildHandler4, 'processor', function processor(req, trx) {
    return 'foo';
  }), _buildHandler4));

  handler({}, res);
};

var testMultipleHooksAfterProcessor = function testMultipleHooksAfterProcessor(key, done) {
  var _buildHandler5;

  var handler = buildHandler((_buildHandler5 = {}, (0, _defineProperty3.default)(_buildHandler5, key, [function (req, trx, result) {
    return '';
  }, function (req, trx, result) {
    return '';
  }, function (req, trx, result) {
    return done();
  }]), (0, _defineProperty3.default)(_buildHandler5, 'processor', function processor(req, trx) {
    return 'foo';
  }), _buildHandler5));

  handler({}, res);
};

var testFailedHookAfterProcessor = function testFailedHookAfterProcessor(key, done) {
  var _buildHandler6;

  var handler = buildHandler((_buildHandler6 = {}, (0, _defineProperty3.default)(_buildHandler6, key, function (req, trx, result) {
    throw new Error();
  }), (0, _defineProperty3.default)(_buildHandler6, 'processor', function processor(req, trx) {
    return 'foo';
  }), _buildHandler6));

  handler({}, res).then(function (result) {
    (0, _chai.expect)(result instanceof Error).to.be.true;
    done();
  });
};