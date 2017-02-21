import { resourceRenderer, applyToRecords, resourceResponder } from '../utils'

export default (name, action) => {

  return (options) => {

    const serializer = options.serializer[name] || options.serializer.all

    const renderer = (req, result) => {

      const renderer = resourceRenderer(serializer, options)

      return (options.actions[name].on === 'collection') ? applyToRecords(req, result, renderer).then(result => result.records) : result

    }

    const responder = resourceResponder(200, 'Success')

    return { renderer, responder }

  }

}
