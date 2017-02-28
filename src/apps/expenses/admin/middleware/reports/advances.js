import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'

export default resources({
  defaultSort: '-date_needed',
  filterParams: ['user_id','expense_type_id','project_id','vendor_id','date_needed'],
  model: Advance,
  name: 'advance',
  ownedByUser: false,
  only: ['list','show'],
  pathPrefix: '/reports',
  query: (qb, req, filters) => {
    qb.where('is_approved', true)
  },
  serializer: AdvanceSerializer,
  sortParams: ['date_needed'],
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
