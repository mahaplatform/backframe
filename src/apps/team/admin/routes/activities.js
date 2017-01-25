import resources from 'server/middleware/resources'
import Activity from 'platform/models/activity'
import ActivitySerializer from 'platform/serializers/activity_serializer'

export default router => {

  router.use(resources({
    name: 'activity',
    path: 'activities',
    model: Activity,
    serializer: ActivitySerializer,
    withRelated: ['story','user.photo','app']
  }))

}
