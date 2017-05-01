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

export const defaultProcessor = options => (req, resolve, reject) => resolve(null)

export const defaultRenderer = options => (req, result, resolve, reject) => {

  if(!result) return null

  const renderer = render(options)

  const selector = selectFields(req.query.$select)

  const transforms = (req.query.$select) ? [renderer, selector] : [renderer]

  const transform = (req, result, transforms) => {

    if(result.records) return applyToRecords(req, result, transforms)

    return new Promise((resolve, reject) => renderer(req, result, resolve, reject)).then(result => {

      if(!req.query.$select) Promise.resolve(result)

      return new Promise((resolve, reject) => selector(req, result, resolve, reject))

    })

  }

  return transform(req, result, transforms).then(result => {

    resolve(result)

  }).catch(err => {

    throw err

  })

}

export const defaultResponder = message => options => (req, res, result, resolve, reject) => {

  const format = req.params && req.params.format ? req.params.format : 'json'

  if(!_.includes(['csv','tsv','xlsx','xml','json'], format)) {
    throw new BackframeError({ code: 415, message: 'We dont currently support this media type' })
  }

  const pagination = _.pick(result, ['all','total','limit','skip'])

  const data = _.get(result, 'records') ? result.records : result

  const responders = { csvResponder, jsonResponder, tsvResponder: csvResponder, xlsxResponder, xmlResponder }

  const responder = options[`${format}Responder`] || responders[`${format}Responder`]

  return responder(message, pagination, data, req, res, resolve, reject)

}
