import { defaultResponder } from '../../utils'

export default  (buildRoute, options) => {

  const processor = (req, trx, options) => req.resource

  const renderer = (req, trx, result, options) => result.toJSON()

  return buildRoute({
    action: 'edit',
    method: 'get',
    path: `/:${options.primaryKey}/edit`,
    processor,
    renderer,
    responder: defaultResponder('Successfully found record')
  })

}
