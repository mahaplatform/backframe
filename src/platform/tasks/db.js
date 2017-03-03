const _ = require('lodash')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
const Promise = require('bluebird')
const knex = require('platform/services/knex')
const Migrator = require('knex/lib/migrate')
const Seeder = require('knex/lib/seed')
const migrator = new Migrator(knex)
const seeder = new Seeder(knex)

module.exports = {

  migrate(args, environment) {
    return migrator._migrationData().spread((all, completed) => {
      let migrations = _getMigrations(completed, 'up')
      return migrator._runBatch(migrations, 'up')
    })
  },

  rollback(args, environment) {
    return migrator._migrationData().spread((all, completed) => {
      let migrations = _getMigrations(completed, 'down')
      return migrator._runBatch(migrations.reverse(), 'down')
    })
  },

  seed(args, environment) {
    return seeder._seedData().spread((all) => {
      let seeds = _getSeeds('seeds')
      return seeder._runSeeds(seeds)
    })
  },

  fixtures(args, environment) {
    return _loadFixtures('fixtures')
  },

  imports(args, environment) {
    return _loadFixtures('imports')
  },

  setup(args, environment) {
    return this.rollback().then(() => {
      return this.migrate().then(() => {
        return this.seed().then(() => {
          return this.fixtures()
        })
      })
    })
  },

  teardown(args, environment) {
    return this.rollback()
  }

}

function _getMigrations (completed, direction) {
  const files = glob.sync(path.resolve(__dirname, '../../**/db/migrations/*.js'))
  let timestamps = []
  let migrations = {}
  files.map(file => {
    var is_completed = _.includes(completed, file)
    if((direction == 'up' && !is_completed) || (direction == 'down' && is_completed)) {
      const timestamp = file.match(/[0-9]{14}/)[0]
      timestamps.push(timestamp)
      migrations[timestamp] = file
    }
  })
  return timestamps.sort().map((timestamp) => {
    return migrations[timestamp]
  })
}


function _getFixtures (directory) {

  return glob.sync(path.resolve(__dirname, `../../**/db/${directory}/*.js`))

}

function _getSeeds (filename) {

  let seeds = []

  seeds.push(path.resolve(__dirname, '../../platform/db', filename + '.js'))

  const root ='../../apps'

  if(fs.existsSync(path.join(__dirname, root))) {
    fs.readdirSync(path.join(__dirname, root)).filter((app) => {
      if(fs.existsSync(path.join(__dirname, root, app, 'db', filename + '.js'))) {
        seeds.push(path.resolve(__dirname, root, app, 'db', filename + '.js'))
      }
    })
  }

  return seeds

}

function _loadFixtures(directory) {

  let files = _getFixtures(directory)
  return seeder._seedData().spread((all) => {

    return knex.raw('set session_replication_role = replica').then(() => {

      return Promise.map(files, file => {

        const fixture = require(file)

        return knex(fixture.tableName).del().then(() => {

          const chunks = _.chunk(fixture.records, 50)

          return Promise.map(chunks, chunk => {

            return knex(fixture.tableName).insert(chunk)

          })

        }).then(() => {

          return knex.raw(`SELECT pg_catalog.setval(pg_get_serial_sequence('${fixture.tableName}', 'id'), MAX(id)) FROM ${fixture.tableName}`)

        })

      })

    }).then(() => {

      return knex.raw('set session_replication_role = default')

    })
  })

}
