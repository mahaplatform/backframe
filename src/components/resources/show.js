import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'
import BackframeError from '../../utils/error'

export default (buildRoute) => {

  const processor = options => (req, resolve, reject) => load(options)(req).then(resolve).catch(err => {
    throw new BackframeError({ code: 404, message: 'Unable to load resource' })
  })

  return buildRoute({
    method: 'get',
    path: '/:id',
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found record')
  })

}
