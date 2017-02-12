exports.seed = (knex, Promise) => {
    return knex('strategies').del().then(() => {
        return knex('strategies').insert([
            {
                id: 1,
                team_id: 1,
                name: 'cornell'
            }, {
                id: 2,
                team_id: 2,
                name: 'google'
            }
        ])
    })
}
