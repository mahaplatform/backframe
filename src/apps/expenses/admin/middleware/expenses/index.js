import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import { createExpenseLogger } from './loggers'

export default resources({
  allowedParams: ['asset_id','date','project_id','expense_type_id','vendor_id','description','amount','is_visa'],
  defaultSort: '-date',
  filterParams: ['expense_type_id','project_id','date','expenses_approvals.is_approved'],
  logger: {
    create: createExpenseLogger
  },
  model: Expense,
  name: 'expense',
  ownedByUser: true,
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_approvals on expenses_approvals.owner_type=? AND expenses_approvals.owner_id=expenses_expenses.id', 'expenses_expenses')
  },
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor','approval.approved_by']
})
