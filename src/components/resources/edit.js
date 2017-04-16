import load from '../../utils/load'
import { defaultResponder } from '../../utils'

export default  (buildRoute) => {

  const processor = options => (req, resolve, reject) => load(options)(req).then(resolve)

  const renderer = options => (req, result, resolve, reject) => resolve(result.toJSON())

  return buildRoute({
    method: 'get',
    path: '/:id/edit',
    processor,
    renderer,
    responder: defaultResponder('Successfully found record')
  })

}
