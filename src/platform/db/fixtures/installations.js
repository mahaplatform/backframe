exports.seed = (knex, Promise) => {
  return knex('installations').del().then(() => {
    return knex('installations').insert([
      {
        id: 1,
        team_id: 1,
        app_id: 1
      }, {
        id: 2,
        team_id: 1,
        app_id: 2
      }, {
        id: 3,
        team_id: 2,
        app_id: 2
      }
    ])
  })
}
