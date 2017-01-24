import Checkit from 'checkit'
import Team from 'platform/models/team'
import { succeed } from 'platform/utils/responses'
import Error from 'platform/utils/error'

export default (req, res, next) => {

  Checkit({
    subdomain: 'required'
  }).run(req.query).then(fields => {

    Team.where({ subdomain: req.query.subdomain }).fetch({ withRelated: ['logo','strategies'] }).then(team => {

      if(!team) {
        const error = new Error({ code: 404, message: 'Unable to find this domain' })
        return next(error)
      }

      const strategies = team.related('strategies').toJSON().map(strategy => {
        return strategy.name
      })

      const data = {
        id: team.get('id'),
        title: team.get('title'),
        subdomain: team.get('subdomain'),
        logo: team.related('logo').get('url'),
        strategies
      }

      succeed(res, 200, 'Successfully found your team', data)

    }).catch(next)

  }).catch(err => {
    const error = new Error({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
    return next(error)
  })

}
