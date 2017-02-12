exports.seed = (knex, Promise) => {
    return knex('expenses_projects').del().then(() => {
        return knex('expenses_projects').insert([
            {
                id: 1,
                team_id: 1,
                title: 'Primitive Pursuits',
                code: '1234'
            }, {
                id: 2,
                team_id: 1,
                title: 'Eat Smart New York',
                code: '5678'
            }, {
                id: 3,
                team_id: 1,
                title: 'Website Platform',
                code: '9012'
            }
        ])
    })
}
