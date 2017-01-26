import resources from 'platform/middleware/resources'
import Activity from 'platform/models/activity'
import ActivitySerializer from 'platform/serializers/activity_serializer'

export default resources({
  name: 'activity',
  model: Activity,
  serializer: ActivitySerializer,
  withRelated: ['story', 'user.photo', 'app']
})
