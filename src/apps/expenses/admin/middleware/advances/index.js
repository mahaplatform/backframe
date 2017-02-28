import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'

export default resources({
  name: 'advance',
  model: Advance,
  ownedByUser: true,
  path: 'advances',
  rights: ['expenses.manage_expenses'],
  serializer: AdvanceSerializer,
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
