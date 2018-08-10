import _ from 'lodash'

class Logger {

  req = null

  res = null

  trx = null

  log = null

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

  print() {

    const diff = process.hrtime(this.startTime)

    const data = {
      duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3),
      hostname: this.req.hostname,
      method: this.req.method,
      url: this.req.originalUrl.match(/^([^?]*)(.*)?$/)[1],
      statusCode: this.res.statusCode,
      params: this.req.params,
      query: this.req.query,
      body: this.req.body,
      log: this.log,
    }

    console.log(data)

  }

  _startQuery(query) {

    if(!query.__knexQueryUid) return

    this.log.push({
      uid: query.__knexQueryUid,
      sql: query.sql,
      bindings: query.bindings,
      startTime: process.hrtime()
    })

  }

  _endQuery(response, query) {

    if(!query.__knexQueryUid) return

    const index = _.findIndex(this.log, { uid: query.__knexQueryUid })

    const diff = process.hrtime(this.log[index].startTime)

    this.log[index] = {
      sql: this.log[index].sql,
      bindings: this.log[index].bindings,
      duration: (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(3)
    }

  }

}

export default Logger
