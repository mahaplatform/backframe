import _ from 'lodash'
import render from './render'
import { succeed } from './response'
import { applyToRecords, selectFields } from './core'
import BackframeError from './error'
import csvResponder from '../responders/csv_responder'
import jsonResponder from '../responders/json_responder'
import xlsxResponder from '../responders/xlsx_responder'
import xmlResponder from '../responders/xml_responder'

export const defaultQuery = options => (req, trx, qb) => {

  if(options.defaultQuery) {
    qb = options.defaultQuery(req, trx, qb)
  }

  if(options.softDelete) {
    qb = qb.whereNull('deleted_at')
  }

  return qb

}

export const defaultProcessor = options => req => null

export const defaultRenderer = options => async (req, trx, result) => {

  if(!result) return null

  const renderer = render(options)

  const selector = selectFields(req.query.$select)

  const transforms = (req.query.$select) ? [renderer, selector] : [renderer]

  const transform = async (req, trx, result, transforms) => {

    if(result.records) return await applyToRecords(req, trx, result, transforms)

    result = await renderer(req, trx, result)

    if(!req.query.$select) return result

    return await selector(req, trx, result)

  }

  return await transform(req, trx, result, transforms).catch(err => {

    throw err

  })

}

export const defaultResponder = message => options => (req, res, result) => {

  const format = req.params && req.params.format ? req.params.format : options.defaultFormat

  if(!_.includes(['csv','tsv','xlsx','xml','json'], format)) {
    throw new BackframeError({ code: 415, message: 'We dont currently support this media type' })
  }

  const hasRecords = _.get(result, 'records')

  const pagination = hasRecords ? _.pick(result, ['all','total','limit','skip']) : null

  const data = hasRecords ? result.records : result

  const responders = { csvResponder, jsonResponder, tsvResponder: csvResponder, xlsxResponder, xmlResponder }

  const responder = options[`${format}Responder`] || responders[`${format}Responder`]

  return responder(message, pagination, data, req, res)

}
