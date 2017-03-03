import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'

export default resources({
  defaultSort: '-date',
  filterParams: ['user_id','expense_type_id','project_id','vendor_id','date','is_approved'],
  model: Expense,
  name: 'expense',
  ownedByUser: false,
  only: ['list','show'],
  pathPrefix: '/reports',
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
