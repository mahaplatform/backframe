import _ from 'lodash'

class Logger {

  req = null

  res = null

  trx = null

  log = null

  reporter = null

  startTime = null

  init(req, res, trx) {
    this.req = req
    this.res = res
    this.trx = trx
    this.log = []
    this.startTime = process.hrtime()
    this.trx.on('query', this._startQuery.bind(this))
    this.trx.on('query-response', this._endQuery.bind(this))
  }

  setReporter(reporter) {
    this.reporter = reporter
  }

  print() {

    const diff = process.hrtime(this.startTime)

    this.reporter.render({
      duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3),
      req: this.req,
      res: this.res,
      log: this.log
    })

  }

  _startQuery(query) {

    if(!query.__knexQueryUid) return

    this.log.push({
      uid: query.__knexQueryUid,
      sql: query.sql,
      bindings: query.bindings,
      startTime: process.hrtime(),
      duration: 0
    })

  }

  _endQuery(response, query) {

    if(!query.__knexQueryUid) return

    const index = _.findIndex(this.log, { uid: query.__knexQueryUid })

    if(!this.log[index]) return

    const diff = process.hrtime(this.log[index].startTime)

    this.log[index] = {
      sql: this.log[index].sql,
      bindings: this.log[index].bindings,
      duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3)
    }

  }

}

export default Logger
