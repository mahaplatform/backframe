import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'

export default resources({
  defaultSort: '-date',
  filterParams: ['user_id','expense_type_id','project_id','date'],
  model: Expense,
  name: 'expense',
  ownedByUser: false,
  only: 'list',
  pathPrefix: '/reports',
  query: (qb, req, filters) => {
    qb.where('is_approved', true)
  },
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor']
})
