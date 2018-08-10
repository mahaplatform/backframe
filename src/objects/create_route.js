import BackframeError from './error'
import Route from './route'
import _ from 'lodash'

class CreateRoute extends Route {

  constructor(config = {}) {
    super(config)
    this.setMethod('post')
    this.setPath('')
    this.appendBeforeProcessor(this._beforeProcessor)
    this.setProcessor(this._processor)
  }

  _beforeProcessor(req, trx, options) {

    const allowed = [
      ..._.castArray(options.allowedParams),
      ..._.castArray(options.virtualParams),
    ]

  }

  async _processor(req, trx, options) {

    try {

      const params = _.pick(req.body, options.allowedParams)

      console.log(req.body, params, options.allowedParams)

      req.resource = await options.model.forge({
        ...this._defaultParams(req, trx, options),
        ...params
      }).save(null, {
        transacting: trx
      })

      return req.resource

    } catch(err) {

      if(err.errors) throw new BackframeError({
        code: 422,
        message: 'Unable to create record',
        errors: err.toJSON()
      })

    }

  }

  async _defaultParams(req, trx, options) {

    if(!options.defaultParams) return {}

    return await Promise.reduce(options.defaultParams, async (params, defaultParams) => ({
      ...params,
      ...await defaultParams(req, trx, options)
    }), {})

  }

}

export default CreateRoute
