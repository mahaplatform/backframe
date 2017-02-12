export default (qb, filters) => {

  if(filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    qb.whereRaw('LOWER(name) LIKE ?', [term])
  }

  return qb

}
