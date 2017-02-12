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
            let fixtures = _getFixtures()
            return knex.raw('set session_replication_role = replica').then(() => {
                return seeder._runSeeds(fixtures)
            }).then(() => {
                return knex.raw('set session_replication_role = default')
            })
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


function _getFixtures (completed, direction) {

    return glob.sync(path.resolve(__dirname, '../../**/db/fixtures/*.js'))

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
