exports.seed = (knex, Promise) => {
    return knex('roles_rights').del().then(() => {
        return knex('roles_rights').insert([
            {
                id: 1,
                role_id: 1,
                right_id: 1
            }, {
                id: 2,
                role_id: 1,
                right_id: 2
            }, {
                id: 3,
                role_id: 1,
                right_id: 3
            }, {
                id: 4,
                role_id: 1,
                right_id: 4
            }
        ])
    })
}
