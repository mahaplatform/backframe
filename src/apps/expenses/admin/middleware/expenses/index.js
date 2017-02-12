import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'

export default resources({
  filterParams: ['expense_type_id','project_id','date'],
  name: 'expense',
  model: Expense,
  ownedByUser: true,
  path: 'expenses',
  serializer: ExpenseSerializer,
  withRelated: ['user.photo','project','expense_type','vendor']
})
