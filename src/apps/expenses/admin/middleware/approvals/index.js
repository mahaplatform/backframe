 import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'

export default resources({
  defaultSort: '-date',
  filterParams: ['user_id','expense_type_id','project_id','date','is_approved'],
  name: 'expense',
  model: Expense,
  only: ['list','show','update'],
  ownedByUser: false,
  path: 'approvals',
  query: (qb, req, filters) => {
    qb.whereNot({ user_id: req.user.get('id') })
  },
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor']
})
