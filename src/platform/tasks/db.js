const _ = require('lodash')
const glob = require('glob')
const fs = require('fs')
const path = require('path')
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
    return seeder._seedData().spread((all) => {
      let fixtures = _getSeeds('fixtures')
      return seeder._runSeeds(fixtures)
    })
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

function _getSeeds (filename) {
  let seeds = []
  seeds.push(path.resolve(__dirname, '../../platform/db', filename + '.js'))
  const roots = ['../../apps']
  roots.map(root => {
    if(fs.existsSync(path.join(__dirname, root))) {
      fs.readdirSync(path.join(__dirname, root)).filter((app) => {
        if(fs.existsSync(path.join(__dirname, root, app, 'db', filename + '.js'))) {
          seeds.push(path.resolve(__dirname, root, app, 'db', filename + '.js'))
        }
      })
    }
  })
  return seeds
}
