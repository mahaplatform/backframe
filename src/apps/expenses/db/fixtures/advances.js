exports.seed = (knex, Promise) => {
    return knex('expenses_advances').del()
    // .then(() => {
    //   return knex('expenses_advances').insert([
    //   ])
    // })
}
