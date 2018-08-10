import { expect } from 'chai'
import Route from '../objects/route'
import XmlResponder from '../objects/xml_responder'
import XlsxResponder from '../objects/xlsx_responder'
import CsvResponder from '../objects/csv_responder'
import JsonResponder from '../objects/json_responder'

describe('route', () => {

  it('should return the appropriate reponder', () => {

    const route = new Route()

    const responder = route._getResponder({
      params: {
        format: 'json'
      }
    }, {}, null, {})

    expect(responder instanceof JsonResponder).to.be.eql(true)

  })

  it('should pick the appropriate responder class', () => {

    const getResponderClass = (format) => {

      const route = new Route()

      return  route._getResponderClass({
        params: { format }
      }, {})

    }

    expect(getResponderClass('xml')).to.be.eql(XmlResponder)
    expect(getResponderClass('xls')).to.be.eql(XlsxResponder)
    expect(getResponderClass('xlsx')).to.be.eql(XlsxResponder)
    expect(getResponderClass('csv')).to.be.eql(CsvResponder)
    expect(getResponderClass('tsv')).to.be.eql(CsvResponder)
    expect(getResponderClass('json')).to.be.eql(JsonResponder)
    expect(getResponderClass('foo')).to.be.eql(JsonResponder)
    expect(getResponderClass(null)).to.be.eql(JsonResponder)

  })

  it('should pick the appropriate default responder class', () => {

    const route = new Route()

    const responderClass = route._getResponderClass({}, {
      defaultFormat: 'csv'
    })

    expect(responderClass).to.be.eql(CsvResponder)

  })

})
