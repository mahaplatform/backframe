import Error from 'platform/utils/error'

export default (options) => {

  const fetchOptions = (options.withRelated) ? { withRelated:  options.withRelated }: {}

  return (req, res, next) => {

    return options.model.query(qb => {

      qb.where('id', req.params.id )

      if(options.ownedByTeam) {
        qb = qb.where('team_id', req.team.get('id'))
      }

      if(options.ownedByUser) {
        qb = qb.where('user_id', req.user.get('id'))
      }

    }).fetch(fetchOptions).then(record => {

      if(!record) {
        const error = new Error({ code: 404, message: `Unable to find ${options.name}` })
        return next(error)
      }

      req.resource = record

      next()

    }).catch(next)

  }

}
