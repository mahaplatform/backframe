import Responder from './responder'
import _ from 'lodash'
import xml from 'xml'

class XmlResponder extends Responder {

  render() {

    const paginationSegment = this.pagination ? {
      pagination: [
        { all: this.pagination.all },
        { total: this.pagination.total },
        { limit: this.pagination.limit },
        { skip: this.pagination.skip }
      ]
    } : null

    this.res.status(200).type('application/xml').send(xml({
      response: [
        {
          data: _.castArray(this.data).map(record => ({
            record: this._toXML(record)
          }))
        },
        ...paginationSegment || []
      ]
    }, true))

  }

  _toXML = (hash) => Object.keys(hash).map(key => {

    const value = hash[key]

    return { [key]: (_.isPlainObject(value) ? toXML(value) : value) }

  })

}

export default XmlResponder
