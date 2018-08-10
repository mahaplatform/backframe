import ErrorResponder from './responders/error_responder'
import JsonResponder from './responders/json_responder'
import XlsxResponder from './responders/xlsx_responder'
import CsvResponder from './responders/csv_responder'
import XmlResponder from './responders/xml_responder'
import Reporter from './reporters/reporter'
import Component from './component'
import Logger from './utils/logger'
import Renderer from './renderer'
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

          try {

            req = await this._alterRequest(req, trx, options, this.alterRequest)

            await this._runHooks(req, trx, null, options, this.beforeProcessor, false)

            const result = await this.processor(req, trx, options) || null

            await this._runHooks(req, trx, result, options, this.afterProcessor, true)

            const renderer = new Renderer({ req, trx, result, options })

            const rendered = await renderer.render()

            const altered = await this._alterRecord(req, trx, rendered, options, this.alterRecord)

            const responder = this._getResponder(req, res, altered, options)

            await responder.render()

            await this._runHooks(req, trx, altered, options, this.beforeCommit, true)

            await trx.commit(result)

            await this._runHooks(req, trx, altered, options, this.afterCommit, true)

            logger.print()

          } catch(error) {

            await this._runHooks(req, trx, null, options, this.beforeRollback, false)

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

  async _alterRequest(req, trx, options, hooks) {

    if(!hooks) return req

    return await Promise.reduce(hooks, async (req, hook) => {

      return await hook(req, trx, options) || req

    }, req)

  }

  async _runHooks(req, trx, result, options, hooks, includeResult) {

    if(!hooks) return

    await Promise.mapSeries(hooks, async (hook) => {

      if(includeResult) return await hook(req, trx, result, options)

      await hook(req, trx, options)

    })

  }

  async _afterProcessor(req, trx, result, options, hooks) {

    if(!hooks) return result

    return await Promise.reduce(hooks, async (result, hook) => {

      return await hook(req, trx, result, options) || result

    }, result)

  }

  async _alterRecord(req, trx, result, options, hooks) {

    if(!hooks) return result

    const alterRecord = (req, trx, record, options) => Promise.reduce(hooks, async (record, hook) => {

      return await hook(req, trx, record, options) || record

    }, record)

    if(_.isPlainObject(result) && result.records) {

      const records = await Promise.mapSeries(result.records, record => {
        return alterRecord(req, trx, record, options)
      })

      return {
        ...result,
        records
      }

    }

    return alterRecord(req, trx, result, options)

  }

  _getResponder(req, res, result, options) {

    const responderClass = this._getResponderClass(req, options)

    return new responderClass({ req, res, result, options })

  }

  _getResponderClass(req, options) {

    const format = req.params && req.params.format ? req.params.format : options.defaultFormat

    if(_.includes(['xml'], format)) return XmlResponder

    if(_.includes(['xls','xlsx'], format)) return XlsxResponder

    if(_.includes(['tsv','csv'], format)) return CsvResponder

    return JsonResponder

  }

}

export default Route