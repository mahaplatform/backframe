import load from '../../utils/load'
import { defaultResponder } from '../../utils'

export default  (buildRoute) => {

  const processor = options => (req, trx) => req.resource

  const renderer = options => (req, result) => result.toJSON()

  return buildRoute({
    action: 'edit',
    method: 'get',
    path: '/:id/edit',
    processor,
    renderer,
    responder: defaultResponder('Successfully found record')
  })

}
