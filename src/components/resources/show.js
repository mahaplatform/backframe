import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'
import BackframeError from '../../utils/error'

export default (buildRoute, options) => {

  const processor = (req, trx, options) => req.resource

  return buildRoute({
    action: 'show',
    method: 'get',
    path: `/:${options.primaryKey}`,
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found record')
  })

}
