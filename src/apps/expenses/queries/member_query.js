export default (qb, filters) => {

  if(filters.project_id !== null) {
    qb.where({ project_id: filters.project_id })
  }

  return qb

}
