import resources from 'platform/middleware/resources'
import ExpenseType from '../../../models/expense_type'
import ExpenseTypeQuery from '../../../queries/expense_type_query'

export default resources({
  name: 'expense_type',
  model: ExpenseType,
  query: ExpenseTypeQuery
})