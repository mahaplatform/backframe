import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'

export default resources({
  defaultSort: '-date_needed',
  filterParams: ['user_id','expense_type_id','project_id','vendor_id','date_needed','is_approved'],
  model: Advance,
  name: 'advance',
  ownedByUser: false,
  only: ['list','show'],
  pathPrefix: '/reports',
  serializer: AdvanceSerializer,
  sortParams: ['date_needed'],
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
