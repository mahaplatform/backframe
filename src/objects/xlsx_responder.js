import Responder from './responder'
import tempfile from 'tempfile'
import Excel from 'exceljs'
import moment from 'moment'
import _ from 'lodash'
import fs from 'fs'

class XlsxResponder extends Responder {

  async render() {

    const records = _.castArray(this.data)

    const labels = this._selectedLabels(this.req.query.$select, records[0])

    const keys = this._selectedKeys(this.req.query.$select, records[0])

    const workbook = new Excel.Workbook()

    const worksheet = workbook.addWorksheet('test')

    worksheet.addRow(labels)

    records.map(record => worksheet.addRow(keys.map(key => {

      return _.get(record, key)

    })))

    const tempFilePath = tempfile('.xlsx')

    await workbook.xlsx.writeFile(tempFilePath)

    const data = fs.readFileSync(tempFilePath)

    if(this.req.query.download) {

      const filename = this.req.query.filename || 'export'

      const datestamp = moment().format('YYYYMMDDHHmm')

      this.res.setHeader('Content-disposition', `attachment; filename=${filename}-${datestamp}.xlsx`)

    }

    this.res.status(200).type('application/vnd.ms-excel').send(data)

  }

}

export default XlsxResponder
