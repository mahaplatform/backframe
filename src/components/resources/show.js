import { defaultRenderer, defaultResponder } from '../../utils'
import load from '../../utils/load'

export default  (buildRoute) => {

  const processor = options => (req, resolve, reject) => load(options)(req).then(resolve).catch(err => {
    reject({ code: 404, message: 'Unable to load resource' })
  })

  return buildRoute({
    method: 'get',
    path: '/:id',
    processor,
    renderer: defaultRenderer,
    responder: defaultResponder('Successfully found record')
  })

}
