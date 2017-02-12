import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'

export default resources({
  name: 'expense',
  model: Expense,
  ownedByUser: true,
  path: 'expenses',
  withRelated: ['user','project','expense_type']
})
