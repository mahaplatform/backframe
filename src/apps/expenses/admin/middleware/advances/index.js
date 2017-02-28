import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'

export default resources({
  allowedParams: ['project_id','expense_type_id','vendor_id','delivery_method','date_needed','description','amount','description'],
  filterParams: ['expense_type_id','project_id','date_needed','is_approved'],
  model: Advance,
  name: 'advance',
  ownedByUser: true,
  path: 'advances',
  rights: ['expenses.manage_expenses'],
  serializer: AdvanceSerializer,
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
