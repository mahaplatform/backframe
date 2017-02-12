import { resourceRenderer, applyToRecords, resourceResponder } from '../utils'

export default (name, action) => {

    return (options) => {

        const serializer = action.serializer[name] || action.serializer.all

        const renderer = (req, result) => {
            const renderer = resourceRenderer(serializer, options)
            return applyToRecords(req, result, renderer).then(result => result.records)
        }

        const responder = resourceResponder(200, 'Success')

        return { renderer, responder }

    }

}
