import reserved from './utils/reserved'
import _ from 'lodash'

class Component {

  afterCommit = []

  afterProcessor = []

  alterRecord = []

  alterRequest = []

  beforeCommit = []

  beforeProcessor = []

  beforeRollback = []

  customOptions = {}

  path = null

  constructor(config = {}) {
    if(config.afterCommit) this.appendAfterCommit(config.afterCommit)
    if(config.afterProcessor) this.appendAfterProcessor(config.afterProcessor)
    if(config.alterRecord) this.appendAlterRecord(config.alterRecord)
    if(config.alterRequest) this.appendAlterRequest(config.alterRequest)
    if(config.beforeCommit) this.appendBeforeCommit(config.beforeCommit)
    if(config.beforeProcessor) this.appendBeforeProcessor(config.beforeProcessor)
    if(config.beforeRollback) this.appendBeforeRollback(config.beforeRollback)
    if(config.path) this.setPath(config.path)
    this._setCustomOptions(config)
  }

  appendAlterRequest(hook) {
    this._appendItem('alterRequest', hook)
  }

  prependAlterRequest(hook) {
    this._prependItem('alterRequest', hook)
  }

  appendBeforeProcessor(hook) {
    this._appendItem('beforeProcessor', hook)
  }

  prependBeforeProcessor(hook) {
    this._prependItem('beforeProcessor', hook)
  }

  appendAfterProcessor(hook) {
    this._appendItem('afterProcessor', hook)
  }

  prependAfterProcessor(hook) {
    this._prependItem('afterProcessor', hook)
  }

  appendAlterRecord(hook) {
    this._appendItem('alterRecord', hook)
  }

  prependAlterRecord(hook) {
    this._prependItem('alterRecord', hook)
  }

  appendBeforeCommit(hook) {
    this._appendItem('beforeCommit', hook)
  }

  prependBeforeCommit(hook) {
    this._prependItem('beforeCommit', hook)
  }

  appendAfterCommit(hook) {
    this._appendItem('afterCommit', hook)
  }

  prependAfterCommit(hook) {
    this._prependItem('afterCommit', hook)
  }

  appendBeforeRollback(hook) {
    this._appendItem('beforeRollback', hook)
  }

  prependBeforeRollback(hook) {
    this._prependItem('beforeRollback', hook)
  }

  setPath(path) {
    this.path = path
  }

  prependPath(path) {
    this.path = `${path}${this.path || ''}`
  }

  _appendItem(type, item) {
    this[type] = [
      ...this[type],
      ..._.castArray(item)
    ]
  }

  _prependItem(type, item) {
    this[type] = [
      ..._.castArray(item),
      ...this[type]
    ]
  }

  _setCustomOptions(options) {
    this.customOptions = {
      ...this.customOptions,
      ..._.omit(options, reserved)
    }
  }

}

export default Component
