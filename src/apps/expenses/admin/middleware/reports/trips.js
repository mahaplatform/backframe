import resources from 'platform/middleware/resources'
import Trip from '../../../models/trip'
import TripSerializer from '../../../serializers/trip_serializer'

export default resources({
  defaultSort: '-date',
  filterParams: ['user_id','project_id','date'],
  model: Trip,
  name: 'trip',
  ownedByUser: false,
  only: ['list','show'],
  pathPrefix: '/reports',
  query: (qb, req, filters) => {
    qb.where('is_approved', true)
  },
  serializer: TripSerializer,
  sortParams: ['date'],
  withRelated: ['user','project','approved_by']
})
