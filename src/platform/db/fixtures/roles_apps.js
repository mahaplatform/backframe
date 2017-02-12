exports.seed = (knex, Promise) => {
  return knex('roles_apps').del().then(() => {
    return knex('roles_apps').insert([
      {
        role_id: 1,
        app_id: 1
      }, {
        role_id: 1,
        app_id: 2
      }, {
        role_id: 1,
        app_id: 3
      }, {
        role_id: 1,
        app_id: 4
      }, {
        role_id: 1,
        app_id: 5
      }
    ])
  })
}
