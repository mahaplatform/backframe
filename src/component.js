import reserved from './utils/reserved'
import _ from 'lodash'

class Component {

  afterCommit = null

  afterProcessor = null

  alterRecord = null

  alterRequest = null

  beforeCommit = null

  beforeProcessor = null

  beforeRollback = null

  customOptions = null

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
    this._appendHook('alterRequest', hook)
  }

  prependAlterRequest(hook) {
    this._prependHook('alterRequest', hook)
  }

  appendBeforeProcessor(hook) {
    this._appendHook('beforeProcessor', hook)
  }

  prependBeforeProcessor(hook) {
    this._prependHook('beforeProcessor', hook)
  }

  appendAfterProcessor(hook) {
    this._appendHook('afterProcessor', hook)
  }

  prependAfterProcessor(hook) {
    this._prependHook('afterProcessor', hook)
  }

  appendAlterRecord(hook) {
    this._appendHook('alterRecord', hook)
  }

  prependAlterRecord(hook) {
    this._prependHook('alterRecord', hook)
  }

  appendBeforeCommit(hook) {
    this._appendHook('beforeCommit', hook)
  }

  prependBeforeCommit(hook) {
    this._prependHook('beforeCommit', hook)
  }

  appendAfterCommit(hook) {
    this._appendHook('afterCommit', hook)
  }

  prependAfterCommit(hook) {
    this._prependHook('afterCommit', hook)
  }

  appendBeforeRollback(hook) {
    this._appendHook('beforeRollback', hook)
  }

  prependBeforeRollback(hook) {
    this._prependHook('beforeRollback', hook)
  }

  setPath(path) {
    this.path = path
  }

  prependPath(path) {
    this.path = `${path}${this.path || ''}`
  }

  _appendHook(type, item) {
    this[type] = [
      ...this[type] || [],
      ..._.castArray(item)
    ]
  }

  _prependHook(type, item) {
    this[type] = [
      ..._.castArray(item),
      ...this[type] || []
    ]
  }

  _setCustomOptions(options) {
    this.customOptions = {
      ...this.customOptions || {},
      ..._.omit(options, reserved)
    }
  }

}

export default Component
