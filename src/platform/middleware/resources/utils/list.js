import _ from 'lodash'
import { coerceArray } from './index'

// takes sort param and converts to sort array
export const extractSort = (query, defaults, allowedParams = []) => {

  if(query) {
    query = coerceArray(query).filter(item => _.includes(allowedParams, item.key))
  }

  const sort = query || defaults || null

  if(!sort) return null

  return coerceArray(sort).map(item => ({
    key: item.replace('-', ''),
    order: (item[0] === '-') ? 'desc' : 'asc'
  }))

}

// map query filters to a qb object
export const filter = (qb, filters) => {

  return Object.keys(filters).reduce((qb, key) => {

    if(filters[key]) {

      if(filters[key].$eq) {

        qb.where(key, filters[key].$eq)

      } else if(filters[key].$ne) {

        qb.whereNot(key, filters[key].$ne)

      } else if(filters[key].$in) {

        qb.whereIn(key, filters[key].$in)

      } else if(filters[key].$nin) {

        qb.whereNotIn(key, filters[key].$nin)

      } else if(filters[key].$lt) {

        qb.where(key, '<', filters[key].$lt)

      } else if(filters[key].$lte) {

        qb.where(key, '<=', filters[key].$lte)

      } else if(filters[key].$gt) {

        qb.where(key, '>', filters[key].$gt)

      } else if(filters[key].$gte) {

        qb.where(key, '>=', filters[key].$gte)

      }

    }

    return qb

  }, qb)

}

// cherry pick fields from a serialized record
export const selectFields = (select) => {

  return (req, serialized) => {

    return new Promise((resolve, reject) => resolve()).then(() => {

      const fields = coerceArray(select)

      const attributes = _.pick(serialized.attributes, fields)

      return select ? { id: serialized.id, type: serialized.type, attributes } : serialized

    })


  }


}
