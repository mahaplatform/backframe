import render from './render'
import { succeed } from './response'
import { applyToRecords, selectFields } from './core'

export const defaultQuery = (req, options, qb, filters) => {

  const tableName = options.model.extend().__super__.tableName

  if(options.ownedByUser) {
    qb = qb.where(`${tableName}.user_id`, req.user.get('id'))
  }

  if(options.query ) {
    options.query(qb, req, filters)
  }

  if(options.softDelete) {
    qb = qb.whereNull('deleted_at')
  }

  return qb

}

export const defaultProcessor = (req, resolve, reject) => resolve(null)

export const defaultRenderer = (options) => {

  return (req, result, resolve, reject) => {

    if(!result) return null

    const renderer = render(options)

    const selector = selectFields(req.query.$select)

    const transform = () => {

      if(result.records) return applyToRecords(req, result, [renderer, selector])

      return new Promise((resolve, reject) => renderer(req, result, resolve, reject)).then(result => {

        return new Promise((resolve, reject) => selector(req, result, resolve, reject))

      })

    }

    return transform().then(result => {

      resolve(result)

    }).catch(err => {
      console.log(err)

      reject({ code: 500, message: 'Unable to render response' })
    })

  }

}

export const defaultResponder = (status, message) => {

  return (req, res, data, resolve, reject) => {

    const extra = data ? { data } : null

    succeed(res, status, message, extra)

    resolve()

  }

}
