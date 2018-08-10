import NotFoundRoute from './not_found_route'
import Component from './component'
import Segment from './segment'
import _ from 'lodash'

class Backframe extends Component {

 defaultFormat = 'json'

  defaultLimit = 100

  knex = null

  logger = null

  path = null

  plugins = []

  segments = []

  constructor(config = {}) {
    super(config)
    if(config.defaultFormat) this.setDefaultFormat(config.defaultFormat)
    if(config.defaultLimit) this.setDefaultLimit(config.defaultLimit)
    if(config.knex) this.setKnex(config.knex)
    if(config.logger) this.setLogger(config.logger)
    if(config.path) this.setPath(config.path)
    if(config.plugins) this.appendPlugin(config.plugins)
    if(config.segments) this.appendSegment(config.segments)
  }

  setDefaultFormat(defaultFormat) {
    this.defaultFormat = defaultFormat
  }

  setDefaultLimit(defaultLimit) {
    this.defaultLimit = defaultLimit
  }

  setKnex(knex) {
    this.knex = knex
  }

  setLogger(logger) {
    this.logger = logger
  }

  setPath(path) {
    this.path = path
  }

  setPlugins(plugins) {
    this.plugins = plugins
  }

  appendPlugin(plugin) {
    this._appendItem('plugins', plugin)
  }

  prependPlugin(plugin) {
    this._prependItem('plugins', plugin)
  }

  setSegments(segments) {
    this.segments = segments
  }

  appendSegment(segment) {
    this._appendItem('segments', segment)
  }

  prependSegment(segment) {
    this._prependItem('segments', segment)
  }

  render() {

    this.plugins.map(plugin => {

      plugin.apply(this)

    })

    const options = {
      knex: this.knex,
      logger: this.logger,
      defaultFormat: this.defaultFormat,
      defaultLimit: this.defaultLimit
    }

    return [

      ...this.segments.reduce((routes, segment) => {

        if(this.path) segment.prependPath(this.path)

        if(this.beforeProcessor) segment.prependBeforeProcessor(this.beforeProcessor)

        if(this.afterProcessor) segment.prependAfterProcessor(this.afterProcessor)


        return [
          ...routes,
          ...segment.render(options)
        ]

      }, []),

      NotFoundRoute.render(options)

    ]
  }

}

export default Backframe
