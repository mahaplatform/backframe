export default (qb, filters) => {

    if(filters.q) {
        const term = `%${filters.q.toLowerCase()}%`
        qb.whereRaw('(LOWER(title) LIKE ?)', [term])
    }

    return qb

}
