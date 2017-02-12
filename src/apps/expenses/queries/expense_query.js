import moment from 'moment'

export default (qb, filters) => {

  qb = filter(qb, filters)

  return qb

}

const filter = (qb, filters) => {

  Object.keys(filters).map(key => {
    if(filters[key].$in) {
      qb.whereIn(key, filters[key].$in)
    } else if(filters[key].$nin) {
      qb.whereNotIn(key, filters[key].$nin)
    } else if(filters[key].$lt) {
      qb.whereNotIn(key, '<', filters[key].$lt)
    } else if(filters[key].$lte) {
      qb.whereNotIn(key, '<=', filters[key].$lte)
    } else if(filters[key].$gt) {
      qb.whereNotIn(key, '>', filters[key].$gt)
    } else if(filters[key].$gte) {
      qb.whereNotIn(key, '>=', filters[key].$gte)
    } else if(filters[key].$ne) {
      qb.whereNotIn(key, '!=', filters[key].$ne)
    }
  })

  if(filters.daterange && filters.daterange.$eq) {
    if(filters.daterange.$eq === 'this_week') {
      qb = daterange(qb, 0, 'week')
    } else if(filters.daterange.$eq === 'last_week') {
      qb = daterange(qb, -1, 'week')
    } else if(filters.daterange.$eq === 'next_week') {
      qb = daterange(qb, 1, 'week')
    } else if(filters.daterange.$eq === 'this_month') {
      qb = daterange(qb, 0, 'month')
    } else if(filters.daterange.$eq === 'last_month') {
      qb = daterange(qb, -1, 'month')
    } else if(filters.daterange.$eq === 'next_month') {
      qb = daterange(qb, 1, 'month')
    } else if(filters.daterange.$eq === 'this_quarter') {
      qb = daterange(qb, 0, 'quarter')
    } else if(filters.daterange.$eq === 'last_quarter') {
      qb = daterange(qb, -1, 'quarter')
    } else if(filters.daterange.$eq === 'next_quarter') {
      qb = daterange(qb, 1, 'quarter')
    } else if(filters.daterange.$eq === 'this_year') {
      qb = daterange(qb, 0, 'year')
    } else if(filters.daterange.$eq === 'last_year') {
      qb = daterange(qb, -1, 'year')
    } else if(filters.daterange.$eq === 'next_year') {
      qb = daterange(qb, 1, 'year')
    }
  }

  return qb

}

const daterange = (qb, quantity, unit) => {
  qb.where('date', '>=', moment().add(quantity, unit).startOf(unit).format('YYYY-MM-DD')).where('date', '<=', moment().add(quantity, unit).endOf(unit).format('YYYY-MM-DD'))
  return qb
}
