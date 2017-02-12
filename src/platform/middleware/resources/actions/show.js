import { resourceRenderer, resourceResponder } from '../utils'
import load from '../helpers/load'

export default options => {

  const serializer = options.serializer.show || options.serializer.all

  const processor = req => load('show', options)(req)

  const renderer = resourceRenderer(serializer, options)

  const responder = resourceResponder(200, `Sucessfully found ${options.name}`)

  return { processor, renderer, responder }

}
