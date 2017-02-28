import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import { createExpenseLogger } from './loggers'

export default resources({
  allowedParams: ['asset_id','date','project_id','expense_type_id','vendor_id','description','amount','is_visa'],
  defaultSort: '-date',
  filterParams: ['expense_type_id','project_id','date','is_approved'],
  logger: {
    create: createExpenseLogger
  },
  model: Expense,
  name: 'expense',
  ownedByUser: true,
  path: 'expenses',
  rights: ['expenses.manage_expenses'],
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['user','project','expense_type','vendor']
})
