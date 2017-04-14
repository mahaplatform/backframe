const moment = require('moment')

exports.seed = function(knex, Promise) {
  return knex('kittens').del()
    .then(function () {
      return knex('kittens').insert([
        {
          id: 1,
          name: 'paws',
          age: 5,
          created_at: moment().subtract(2, 'months').format('YYYY-MM-DD HH:MM:ss ZZ'),
          updated_at: moment().subtract(2, 'months').format('YYYY-MM-DD HH:MM:ss ZZ')
        }, {
          id: 2,
          name: 'mittens',
          age: 3,
          created_at: moment().subtract(1, 'months').format('YYYY-MM-DD HH:MM:ss ZZ'),
          updated_at: moment().subtract(1, 'months').format('YYYY-MM-DD HH:MM:ss ZZ')
        }, {
          id: 3,
          name: 'socks',
          age: 7,
          created_at: moment().subtract(1, 'week').format('YYYY-MM-DD HH:MM:ss ZZ'),
          updated_at: moment().subtract(1, 'week').format('YYYY-MM-DD HH:MM:ss ZZ')
        }
      ]);
    });
};
