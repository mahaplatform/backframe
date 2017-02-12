require('platform/services/environment')

import fs from 'fs'
import path from 'path'
import { printRoutingTable } from 'platform/middleware/resources/utils'

const resources = fs.readdirSync(path.join(__dirname, 'apps')).reduce((resources, app) => {

  const adminPath = path.join(__dirname, 'apps', app, 'admin')

  if(fs.existsSync(adminPath)) {

    return [
      ...resources,
      ...require(path.join(adminPath, 'server')).resources
    ]

  }

  return resources

}, [])

const method = process.argv[2] || 'all'

printRoutingTable(resources, method)

process.exit()
