exports.seed = (knex, Promise) => {
    return knex('expenses_members').del().then(() => {
        return knex('expenses_members').insert([
            {
                id: 1,
                team_id: 1,
                project_id: 1,
                user_id: 64
            }, {
                id: 2,
                team_id: 1,
                project_id: 1,
                user_id: 54
            }, {
                id: 3,
                team_id: 1,
                project_id: 1,
                user_id: 49
            }, {
                id: 4,
                team_id: 1,
                project_id: 1,
                user_id: 95
            }, {
                id: 5,
                team_id: 1,
                project_id: 1,
                user_id: 63
            }, {
                id: 6,
                team_id: 1,
                project_id: 2,
                user_id: 13
            }, {
                id: 7,
                team_id: 1,
                project_id: 2,
                user_id: 48
            }, {
                id: 8,
                team_id: 1,
                project_id: 2,
                user_id: 1
            }, {
                id: 9,
                team_id: 1,
                project_id: 3,
                user_id: 19
            }, {
                id: 10,
                team_id: 1,
                project_id: 3,
                user_id: 21
            }, {
                id: 11,
                team_id: 1,
                project_id: 3,
                user_id: 1
            }
        ])
    })
}
