import resources from 'platform/middleware/resources'
import Trip from '../../../models/trip'
import TripSerializer from '../../../serializers/trip_serializer'

export default resources({
  allowedParams: ['project_id', 'date', 'description', 'time_leaving', 'time_arriving', 'odometer_start', 'odometer_end', 'total_miles'],
  defaultParams: (req) => ({
    mileage_rate: req.apps.expenses.mileage_rate,
    amount: req.body.total_miles * req.apps.expenses.mileage_rate
  }),
  filterParams: ['project_id','date','is_approved'],
  name: 'trip',
  model: Trip,
  ownedByUser: true,
  rights: ['expenses.manage_expenses'],
  serializer: TripSerializer,
  withRelated: ['user','project','approved_by']
})
