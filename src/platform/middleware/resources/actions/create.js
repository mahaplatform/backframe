import { mergeParams, filterParams, resourceRenderer, resourceResponder, resourceLogger } from '../utils'

export default options => {

  const processor = req => {

    const allowedParams = mergeParams(options.allowedParams.all, options.allowedParams.create)

    const data = {
      ...options.defaults,
      ...options.ownedByTeam ? { team_id: req.team.get('id') } : {},
      ...options.ownedByUser ? { user_id: req.user.get('id') } : {},
      ...filterParams(req.body, allowedParams)
    }

    return options.model.forge(data).save().catch(err => {

      if(err.errors) throw({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      throw(err)

    })

  }

  const serializer = options.serializer.create || options.serializer.all

  const renderer = resourceRenderer(serializer, options)

  const responder = resourceResponder(200, `Sucessfully created ${options.name}`)

  const logger = resourceLogger('created {object1}')

  return { processor, renderer, responder, logger }

}
