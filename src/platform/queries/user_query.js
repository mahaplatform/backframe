import knex from 'platform/services/knex'

export default (qb, filters) => {

  if(filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    qb.whereRaw('(LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ?)', [term,term,term])
  }

  qb.leftJoin('users_roles', 'users_roles.user_id', 'users.id').distinct(knex.raw('users.id, users.*'))

  return qb

}
