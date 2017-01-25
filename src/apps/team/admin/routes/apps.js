import resources from 'server/middleware/resources'
import App from 'platform/models/app'
import AppSerializer from 'platform/serializers/app_author'

export default router => {

  router.use(resources({
    name: 'app',
    path: 'apps',
    model: App,
    serializer: AppSerializer,
    team: false,
    withRelated: ['author','category'],
    filter: (qb, req) => qb
      .column('apps.*', 'installations.team_id')
      .leftJoin('installations', function() {
        this.on('installations.app_id', '=', 'apps.id').andOn('installations.team_id', '=', req.team.get('id'))
      })
      .groupBy('apps.id','installations.team_id')
  }))

}
