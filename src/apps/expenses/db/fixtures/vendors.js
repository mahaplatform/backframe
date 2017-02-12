exports.seed = (knex, Promise) => {
    return knex('expenses_vendors').del().then(() => {
        return knex('expenses_vendors').insert([
            {
                id: 1,
                team_id: 1,
                name: 'Walmart'
            }, {
                id: 2,
                team_id: 1,
                name: 'Target'
            }, {
                id: 3,
                team_id: 1,
                name: 'Wegmans'
            }
        ])
    })
}
