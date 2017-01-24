import Promise from 'bluebird'
import _ from 'lodash'
import fs from 'fs'
import tempfile from 'tempfile'
import Excel from 'exceljs'
import { flattenKeys } from '../utils'

export default (all, total, limit, skip, records, options, req, res, next) => {

  return new Promise((resolve, reject) => {

    const keys = flattenKeys(records[0])
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('test')

    worksheet.addRow(keys)

    records.map(record => {
      worksheet.addRow(keys.map(key => {
        return _.get(record, key)
      }))
    })

    const tempFilePath = tempfile('.xlsx')
    workbook.xlsx.writeFile(tempFilePath).then(() => {
      fs.readFile(tempFilePath, (err, data) => {
        if(err) next(err)
        res.send(data)
        next()
        resolve()
      })
      return null
    }).catch(next)

  })

}
