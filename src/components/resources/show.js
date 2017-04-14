import { defaultRenderer } from '../../utils'
import load from '../../utils/load'
import CSVRenderer from '../../renderers/csv'
import JSONRenderer from '../../renderers/json'
import XLSXRenderer from '../../renderers/xlsx'
import XMLRenderer from '../../renderers/xml'

export default  (buildRoute) => {

  const processor = options => (req, resolve, reject) => load(options)(req).then(resolve).catch(err => {
    reject({ code: 404, message: 'Unable to load resource' })
  })

  const renderer = options => defaultRenderer(options)

  const responder = options => (req, res, result, resolve, reject) => {

    const format = req.params.format || 'json'

    switch(format) {

      case 'csv': return CSVRenderer(',')({}, result, req, res, resolve, reject)

      case 'tsv': return CSVRenderer('\t')({}, result, req, res, resolve, reject)

      case 'xlsx': return XLSXRenderer({}, result, req, res, resolve, reject)

      case 'xml': return XMLRenderer({}, result, req, res, resolve, reject)

      case 'json': return JSONRenderer({}, result, req, res, resolve, reject)

      default: return reject({ code: 415, message: 'We dont currently support this media type' })

    }

  }

  return buildRoute({
    method: 'get',
    path: '/:id',
    processor,
    renderer,
    responder
  })

}
