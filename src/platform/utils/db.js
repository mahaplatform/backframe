const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const Migrator = require('knex/lib/migrate')
const Seeder = require('knex/lib/seed')
const knex = require('platform/services/knex')

const migrator = new Migrator(knex)
const seeder = new Seeder(knex)

const migrate = (args, environment) => {
  return migrator._migrationData().spread((all, completed) => {
    let migrations = _getMigrations(completed, 'up')
    return migrator._runBatch(migrations, 'up')
  })
}

const rollback = (args, environment) => {
  return migrator._migrationData().spread((all, completed) => {
    let migrations = _getMigrations(completed, 'down')
    return migrator._runBatch(migrations.reverse(), 'down')
  })
}

const seed = (args, environment) => {
  return seeder._seedData().spread((all) => {
    let seeds = ['0_seeds.js']
    return seeder._runSeeds(seeds)
  })
}

const fixtures = (args, environment) => {
  return seeder._seedData().spread((all) => {
    let fixtures = ['1_fixtures.js']
    return seeder._runSeeds(fixtures)
  })
}

const setup = (args, environment) => {
  return rollback(args, environment).then(() => {
    return migrate(args, environment).then(() => {
      return seed(args, environment).then(() => {
        return fixtures(args, environment)
      })
    })
  })
}

const teardown = (args, environment) => {
  return rollback(args, environment)
}

const _getMigrations = (completed, direction) => {
  const timestamps = []
  const migrations = {}
  fs.readdirSync(path.join(__dirname, '../db/migrations')).filter((migration) => {
    const fullpath = migration
    const is_completed = _.includes(completed, fullpath)
    if((direction == 'up' && !is_completed) || (direction == 'down' && is_completed)) {
      const timestamp = migration.split('_')[0]
      timestamps.push(timestamp)
      migrations[timestamp] = fullpath
    }
  })
  return timestamps.sort().map((timestamp) => {
    return migrations[timestamp]
  })
}

module.exports = {
  migrate: migrate,
  rollback: rollback,
  seed: seed,
  fixtures: fixtures,
  setup: setup,
  teardown: teardown
}
