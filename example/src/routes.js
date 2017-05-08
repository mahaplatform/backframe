import routes from 'app/routes'
import backframe from 'app/services/backframe'

const method = process.argv[2] || 'all'

const routingTable = backframe.table({
  method,
  routes
})

console.log(routingTable)

process.exit()
