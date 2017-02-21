import resources from 'platform/middleware/resources'
import Activity from 'platform/models/activity'
import ActivitySerializer from 'platform/serializers/activity_serializer'

export default resources({
  filterParams: ['app_id','user_id','created_at'],
  name: 'activity',
  model: Activity,
  only: ['list'],
  serializer: ActivitySerializer,
  sortParams: 'created_at',
  withRelated: ['story', 'user.photo', 'app']
})
