import ErrorResponder from './error_responder'
import JsonResponder from './json_responder'
import XlsxResponder from './xlsx_responder'
import CsvResponder from './csv_responder'
import XmlResponder from './xml_responder'
import Component from './component'
import Renderer from './renderer'
import Logger from './logger'
import Reporter from './reporter'
import _ from 'lodash'

class Route extends Component {

  method = 'get'

  path = ''

  processor = () => {}

  routeOptions = {}

  serializer = null

  constructor(config = {}) {
    super(config)
    if(config.method) this.setMethod(config.method)
    if(config.path) this.setPath(config.path)
    if(config.processor) this.setProcessor(config.processor)
    if(config.serializer) this.setSerializer(config.serializer)
  }

  setMethod(method) {
    this.method = method
  }

  setPath(path) {
    this.path = path
  }

  prependPath(path) {
    this.path = `${path}${this.path}`
  }

  setProcessor(processor) {
    this.processor = processor
  }

  setSerializer(serializer) {
    this._setRouteParams('serializer', serializer)
  }

  render(routeOptions = {}) {

    const options = {
      ...this.routeOptions,
      ...routeOptions
    }

    const reporter = new Reporter()

    const logger = options.logger ? new options.logger() : new Logger()

    logger.setReporter(reporter)

    return {

      method: this.method,

      path: `${this.path.replace(':id',':id(\\d+)')}.:format?`,

      handler: (req, res, next) => {

        return options.knex.transaction(async trx => {

          logger.init(req, res, trx)

          await Promise.reduce(this.alterRequest, async (req, hook) => {

            return await hook(req, trx, options)

          }, req)

          try {

            req = await Promise.reduce(this.alterRequest, async (req, hook) => {

              return await hook(req, trx, options)

            }, req)

            await Promise.mapSeries(this.beforeProcessor, async (hook) => {

              await hook(req, trx, options)

            })

            let result = await this.processor(req, trx, options) || null

            result = await Promise.reduce(this.afterProcessor, async (result, hook) => {

              return await hook(req, trx, result, options)

            }, result)

            const renderer = new Renderer({ req, trx, result, options })

            const rendered = await renderer.render()

            const responder = this._getResponder(req, res, options, rendered)

            await responder.render()

            await Promise.mapSeries(this.beforeCommit, async (hook) => {

              await hook(req, trx, options)

            })

            await trx.commit(result)

            await Promise.mapSeries(this.afterCommit, async (hook) => {

              await hook(req, trx, options)

            })

            logger.print()

          } catch(error) {

            await Promise.mapSeries(this.beforeRollback, async (hook) => {

              await hook(req, trx, options)

            })

            const error_responder = new ErrorResponder({ res, error })

            error_responder.render()

            await trx.rollback(error)

          }

        }).catch((error) => {

          logger.print()

          if(process.env.NODE_ENV !== 'production') console.log(error)

        })

      }

    }

  }

  _setRouteParams(key, value) {
    this.routeOptions[key] = this[key] = value
  }

  _responderName(req, options) {

    const format = req.params && req.params.format ? req.params.format : options.defaultFormat

    if(!_.includes(['csv','tsv','xlsx','xml','json'], format)) return 'JsonResponder'

    return `${_.capitalize(format)}Responder`

  }

  _getResponder(req, res, options, rendered) {

    const responderName = this._responderName(req, options)

    const responders = { CsvResponder, JsonResponder, TsvResponder: CsvResponder, XlsxResponder, XmlResponder }

    const responderClass = options[responderName] || responders[responderName]

    return new responderClass({ req, res, options, rendered })

  }

}

export default Route
