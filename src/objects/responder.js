import _ from 'lodash'

class Responder {

  req = null

  res = null

  options = null

  pagination = null

  data = null

  constructor(config = {}) {
    this.req = config.req
    this.res = config.res
    this.options = config.options
    this.pagination = config.rendered.records ? this._getPagination(config.rendered) : null
    this.data = config.rendered.records ? config.rendered.records : config.rendered
  }

  _getPagination(result) {

    if(result.next !== undefined) return _.pick(result, ['next','skip'])

    if(result.all !== undefined) return _.pick(result, ['all','total','limit','skip'])

    return null

  }

  _selectedLabels(select, record) {

    if(_.isPlainObject(select)) return Object.keys(select)

    if(_.isNil(select)) return this._flattenKeys(record)

    return _.castArray(select)

  }

  _selectedKeys(select, record) {

    if(_.isPlainObject(select)) return Object.values(select)

    if(_.isNil(select)) return this._flattenKeys(record)

    return _.castArray(select)

  }

  _flattenKeys(hash, prefix = '') {

    return Object.keys(hash).reduce((keys, key) => [
      ...keys,
      ..._.isObject(hash[key]) ? this._flattenKeys(hash[key], `${prefix}${key}.`) : [`${prefix}${key}`]
    ], [])

  }

}

export default Responder
