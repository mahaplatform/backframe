import resources from 'platform/middleware/resources'
import Trip from '../../../models/trip'

export default resources({
  name: 'trip',
  model: Trip,
  ownedByUser: true
})
