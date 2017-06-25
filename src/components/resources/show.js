import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const processor = options => (req, trx) => req.resource

  return buildRoute({
    action: 'show',
    method: 'get',
    path: '/:id',
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found record')
  })

}
