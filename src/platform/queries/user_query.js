export default (qb, filters) => {

  if(filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    qb.whereRaw('(LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ?)', [term,term,term])
  }

  qb.leftJoin('users_roles', 'users_roles.user_id', 'users.id').groupBy('users.id')

  return qb

}
