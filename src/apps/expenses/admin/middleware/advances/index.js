import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'

export default resources({
  name: 'advance',
  model: Advance,
  ownedByUser: true,
  path: 'advances',
  withRelated: ['user','project','expense_type','approval.approved_by']
})
