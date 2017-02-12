exports.seed = (knex, Promise) => {
    return knex('stories').del().then(() => {
        return knex('stories').insert([
            {
                id: 1,
                text: 'created {subject}'
            }, {
                id: 2,
                text: 'created {subject} in {object1}'
            }
        ])
    })
}
