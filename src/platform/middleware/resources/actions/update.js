import { mergeParams, filterParams, resourceRenderer, resourceResponder, resourceLogger } from '../utils'
import load from '../helpers/load'

export default options => {

  const processor = req => {

    return load('update', options)(req).then(resource => {

      const allowedParams = mergeParams(options.allowedParams.all, options.allowedParams.update)

      const data = filterParams(req.body, allowedParams)

      return resource.save(data, { patch: true })

    }).catch(err => {

      if(err.errors) throw({ code: 422, message: `Unable to update ${options.name}`, errors: err.toJSON() })

      throw(err)

    })

  }

  const serializer = options.serializer.update || options.serializer.all

  const renderer = resourceRenderer(serializer, options)

  const responder = resourceResponder(201, `Sucessfully updated ${options.name}`)

  const logger = resourceLogger('updated {object1}')

  return { processor, renderer, responder, logger }

}
