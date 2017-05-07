import routes from 'app/routes'
import { table } from 'app/services/backframe'

const method = process.argv[2] || 'all'

const routingTable = table({
  method,
  routes
})

console.log(routingTable)

process.exit()
