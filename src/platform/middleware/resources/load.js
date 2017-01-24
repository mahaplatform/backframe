import { fail } from 'platform/utils/responses'

export default (options) => {

  return (req, res, next) => {

    return options.model.query(qb => {

      qb.where('id', req.params.id )

      if(options.ownedByUser) {
        qb = qb.where('user_id', req.user.get('id'))
      }

    }).fetch().then(record => {

      if(!record) {
        return fail(res, 404, `Unable to find ${options.name}`)
      }

      req[options.name] = record

      next()

    }).catch(next)

  }

}
