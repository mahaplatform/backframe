import resources from 'platform/middleware/resources'
import Trip from '../../../models/trip'

export default resources({
  allowedParams: ['project_id', 'date', 'description', 'time_leaving', 'time_arriving', 'odometer_start', 'odometer_end', 'total_miles'],
  name: 'trip',
  model: Trip,
  ownedByUser: true,
  rights: ['expenses.manage_expenses'],
  withRelated: ['approval.approved_by']
})
