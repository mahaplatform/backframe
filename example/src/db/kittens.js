const _ = require('lodash')
const moment = require('moment')
const faker = require('faker')

const count = Array.apply(null, { length: 1000 }).map(Number.call, Number)
const kittens = count.map((i, index) => ({
  id: index + 1,
  name: faker.fake('{{name.firstName}}'),
  age: 5,
  created_at: moment().subtract(2, 'months').format('YYYY-MM-DD HH:MM:ss ZZ'),
  updated_at: moment().subtract(2, 'months').format('YYYY-MM-DD HH:MM:ss ZZ')
}))

exports.seed = function(knex, Promise) {
  return knex('kittens').del()
    .then(function () {
      const chunks = _.chunk(kittens, 100)
      return Promise.map(chunks, chunk => {
        return knex('kittens').insert(chunk)
      })
    })
}
