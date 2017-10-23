import _ from 'lodash'
import render from './render'
import { succeed } from './response'
import { applyToRecords, selectFields } from './core'
import { coerceArray } from './core'
import BackframeError from './error'
import csvResponder from '../responders/csv_responder'
import jsonResponder from '../responders/json_responder'
import xlsxResponder from '../responders/xlsx_responder'
import xmlResponder from '../responders/xml_responder'

export const defaultQuery = (req, trx, qb, options) => {

  if(options.defaultQuery) {

    coerceArray(options.defaultQuery).map(defaultQuery => {

      defaultQuery(req, trx, qb, options)

    })

  }

  if(options.softDelete) {
    qb.whereNull('deleted_at')
  }

}

export const defaultParams = async (req, trx, options) => {

  if(options.defaultParams) {

    return await Promise.reduce(options.defaultParams, async (params, defaultParams) => {

      const defaults = await defaultParams(req, trx, options)

      return {
        ...params,
        ...defaults,
      }

    }, {})

  }

  return {}

}

export const defaultProcessor = (req, options) => null

export const defaultRenderer = async (req, trx, result, options) => {

  if(!result) return null

  const selector = selectFields(req.query.$select)

  const transforms = (req.query.$select) ? [render, selector] : [render]

  const transform = async (req, trx, result, transforms, options) => {

    if(result.records) return await applyToRecords(req, trx, result, transforms, options)

    result = await render(req, trx, result, options)

    if(!req.query.$select) return result

    return await selector(req, trx, result)

  }

  return await transform(req, trx, result, transforms, options)

}

export const defaultResponder = message => (req, res, result, options) => {

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
