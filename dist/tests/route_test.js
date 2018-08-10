'use strict';

var _chai = require('chai');

var _route = require('../objects/route');

var _route2 = _interopRequireDefault(_route);

var _xml_responder = require('../objects/xml_responder');

var _xml_responder2 = _interopRequireDefault(_xml_responder);

var _xlsx_responder = require('../objects/xlsx_responder');

var _xlsx_responder2 = _interopRequireDefault(_xlsx_responder);

var _csv_responder = require('../objects/csv_responder');

var _csv_responder2 = _interopRequireDefault(_csv_responder);

var _json_responder = require('../objects/json_responder');

var _json_responder2 = _interopRequireDefault(_json_responder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('route', function () {

  it('should return the appropriate reponder', function () {

    var route = new _route2.default();

    var responder = route._getResponder({
      params: {
        format: 'json'
      }
    }, {}, null, {});

    (0, _chai.expect)(responder instanceof _json_responder2.default).to.be.eql(true);
  });

  it('should pick the appropriate responder class', function () {

    var getResponderClass = function getResponderClass(format) {

      var route = new _route2.default();

      return route._getResponderClass({
        params: { format: format }
      }, {});
    };

    (0, _chai.expect)(getResponderClass('xml')).to.be.eql(_xml_responder2.default);
    (0, _chai.expect)(getResponderClass('xls')).to.be.eql(_xlsx_responder2.default);
    (0, _chai.expect)(getResponderClass('xlsx')).to.be.eql(_xlsx_responder2.default);
    (0, _chai.expect)(getResponderClass('csv')).to.be.eql(_csv_responder2.default);
    (0, _chai.expect)(getResponderClass('tsv')).to.be.eql(_csv_responder2.default);
    (0, _chai.expect)(getResponderClass('json')).to.be.eql(_json_responder2.default);
    (0, _chai.expect)(getResponderClass('foo')).to.be.eql(_json_responder2.default);
    (0, _chai.expect)(getResponderClass(null)).to.be.eql(_json_responder2.default);
  });

  it('should pick the appropriate default responder class', function () {

    var route = new _route2.default();

    var responderClass = route._getResponderClass({}, {
      defaultFormat: 'csv'
    });

    (0, _chai.expect)(responderClass).to.be.eql(_csv_responder2.default);
  });
});