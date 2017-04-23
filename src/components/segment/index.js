import _ from 'lodash'
import { mergeHooks, mergeEvents, mergeTypes } from '../../utils/core'
import { validateOptions, defaultOptions } from '../../utils/options'
import * as constants from '../../constants'

export default (backframeOptions = {}) => {

  const TYPES = mergeTypes({
    afterHooks: { type: ['function','function[]'], required: false },
    alterRequest: { type: ['function','function[]'], required: false },
    alterResult: { type: ['function','function[]'], required: false },
    beforeHooks: { type: ['function','function[]'], required: false },
    pathPrefix: { type: 'string', required: false },
    processor: { type: 'function', required: false },
    renderer: { type: 'function', required: false },
    responder: { type: 'function', required: false },
    routes: { type: 'object[]', required: true, default: [] }
  }, backframeOptions.plugins)

  return (userOptions = {}) => {

    validateOptions('segment', userOptions, TYPES)

    const options = normalizeOptions(userOptions, TYPES)

    return buildSegment(options)

  }

}

// normalize and merge defaut options
export const normalizeOptions = (userOptions, types) => {

  return {
    ...defaultOptions(types),
    ...userOptions
  }
}

// merge segment options and handlers with route handlers and flatten nested
//segments into an ordered array
export const buildSegment = (options) => {

  const pathPrefix = options.pathPrefix || ''

  const segmentOptions = _.omit(options, [...constants.BACKFRAME_HOOKS,'pathPrefix','routes'])

  return _.flatten(options.routes).reduce((routes, route) => {

    const routeOptions = { ...segmentOptions, ...route.options }

    const mergedRoute = {
      method: route.method,
      path: `${pathPrefix}${route.path}`,
      options: routeOptions,
      handler: {
        ...mergeHooks({}, [ options, route.handler ]),
        ...mergeEvents({}, [ options, route.handler ])
      }
    }

    return [
      ...routes,
      mergedRoute
    ]

  }, [])

}
