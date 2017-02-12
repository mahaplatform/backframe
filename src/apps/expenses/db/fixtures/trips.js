exports.seed = (knex, Promise) => {
    return knex('expenses_trips').del()
    // .then(() => {
    //   return knex('expenses_trips').insert([
    //   ])
    // })
}
