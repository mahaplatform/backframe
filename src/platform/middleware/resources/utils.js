import { Router } from 'express'
import _ from 'lodash'

export const coerceArray = value => {
  return (!_.isArray(value)) ? [value] : value
}

export const includeAction = (action, options) => {

  if(options.include) {
    const included = coerceArray(options.only)
    if(!_.includes(included, action)) {
      return false
    }
  }

  if(options.exclude) {
    const excluded = coerceArray(options.except)
    if(_.includes(excluded, action)) {
      return false
    }
  }

  return true

}

export const wrapWithHooks = (handler, before, after) => {

  let router = Router({
    mergeParams: true
  })

  router.use((req,res,next) => {
    next()
  })

  if(before) {
    coerceArray(before).map(hook => {
      router.use(hook)
    })
  }

  handler(router)

  if(after) {
    coerceArray(after).map(hook => {
      router.use(hook)
    })
  }

  return router

}

export const extractFilters = (query, params) => {
  return _.omit({
    ...query,
    ...params
  }, ['$sort', '$limit', '$skip', '$ids', '$exclude_ids', '$select'])
}

export const extractSort = (query, options) => {

  const sort = query.$sort || options.$sort || null

  if(!sort) return null

  const items = coerceArray(sort)

  return items.map(item => ({
    key: item.replace('-', ''),
    order: (item[0] === '-') ? 'desc' : 'asc'
  }))

}

export const filter = (qb, filters) => {

  return Object.keys(filters).reduce((qb, key) => {
    if(filters[key]) {
      if(filters[key].$eq) {
        qb.where(key, filters[key].$eq)
      } else if(filters[key].$neq) {
        qb.whereNot(key, filters[key].$neq)
      } else if(filters[key].$in) {
        qb.whereIn(key, filters[key].$in)
      } else if(filters[key].$nin) {
        qb.whereNotIn(key, filters[key].$nin)
      } else if(filters[key].$lt) {
        qb.whereNotIn(key, '<', filters[key].$lt)
      } else if(filters[key].$lte) {
        qb.whereNotIn(key, '<=', filters[key].$lte)
      } else if(filters[key].$gt) {
        qb.whereNotIn(key, '>', filters[key].$gt)
      } else if(filters[key].$gte) {
        qb.whereNotIn(key, '>=', filters[key].$gte)
      } else if(filters[key].$ne) {
        qb.whereNotIn(key, '!=', filters[key].$ne)
      }
    }
    return qb
  }, qb)

}

export const serializeRecord = (record, serializer, select) => {
  const serialized = (serializer) ? serializer(record) : record.toJSON()
  const fields = coerceArray(select)
  return select ? _.pick(serialized, ['id', ...fields]) : serialized
}

export const flattenKeys = (hash, prefix = '') => {
  return Object.keys(hash).reduce((keys, key) => {
    if(_.isObject(hash[key])) {
      return [
        ...keys,
        ...flattenKeys(hash[key], `${prefix}${key}.`)
      ]
    } else {
      return [
        ...keys,
        `${prefix}${key}`
      ]
    }
  }, [])
}
