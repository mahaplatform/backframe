import resources from 'platform/middleware/resources'
import App from 'platform/models/app'
import AppSerializer from 'platform/serializers/app_serializer'

export default resources({
  filterParams: ['app_author_id','app_category_id'],
  model: App,
  name: 'app',
  ownedByTeam: false,
  query: (qb, req, filters) => {
    qb.column('apps.*', 'installations.team_id')
      .leftJoin('installations', function() {
        this.on('installations.app_id', '=', 'apps.id').andOn('installations.team_id', '=', req.team.get('id'))
      })
      .groupBy('apps.id','installations.team_id')
  },
  serializer: AppSerializer,
  withRelated: ['author','category']
})
