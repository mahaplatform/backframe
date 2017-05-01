import _ from 'lodash'
import render from './render'
import { succeed } from './response'
import { applyToRecords, selectFields } from './core'
import BackframeError from './error'
import csvResponder from '../responders/csv_responder'
import jsonResponder from '../responders/json_responder'
import xlsxResponder from '../responders/xlsx_responder'
import xmlResponder from '../responders/xml_responder'

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

export const defaultProcessor = options => req => null

export const defaultRenderer = options => async (req, result) => {

  if(!result) return null

  const renderer = render(options)

  const selector = selectFields(req.query.$select)

  const transforms = (req.query.$select) ? [renderer, selector] : [renderer]

  const transform = async (req, result, transforms) => {

    if(result.records) return await applyToRecords(req, result, transforms)


    return await renderer(req, result).then(result => {

      if(!req.query.$select) return result

      return selector(req, result)

    })

  }

  return await transform(req, result, transforms).catch(err => {

    throw err

  })

}

export const defaultResponder = message => options => (req, res, result) => {

  const format = req.params && req.params.format ? req.params.format : 'json'

  if(!_.includes(['csv','tsv','xlsx','xml','json'], format)) {
    throw new BackframeError({ code: 415, message: 'We dont currently support this media type' })
  }

  const pagination = (req.query.$page) ? _.pick(result, ['all','total','limit','skip']) : null

  const data = _.get(result, 'records') ? result.records : result

  const responders = { csvResponder, jsonResponder, tsvResponder: csvResponder, xlsxResponder, xmlResponder }

  const responder = options[`${format}Responder`] || responders[`${format}Responder`]

  return responder(message, pagination, data, req, res)

}
