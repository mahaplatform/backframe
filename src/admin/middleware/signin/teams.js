import Checkit from 'checkit'
import Team from 'platform/models/team'
import { succeed, fail } from 'platform/utils/responses'

export default (req, res, next) => {

  const rules = {
    subdomain: 'required'
  }

  Checkit(rules).run(req.query).then(fields => {

    Team.where({ subdomain: req.query.subdomain }).fetch({ withRelated: ['logo','strategies'] }).then(team => {

      if(!team) {
        return fail(res, 404, 'Unable to find this domain')
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

  }).caught(Checkit.Error, errors => {
    fail(res, 404, 'There were problems with your input', errors)
  })

}
