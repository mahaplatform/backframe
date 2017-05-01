import load from '../../utils/load'
import { defaultResponder } from '../../utils'

export default  (buildRoute) => {

  const processor = options => req => load(options)(req)

  const renderer = options => (req, result) => result.toJSON()

  return buildRoute({
    method: 'get',
    path: '/:id/edit',
    processor,
    renderer,
    responder: defaultResponder('Successfully found record')
  })

}
