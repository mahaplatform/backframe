import resources from 'platform/middleware/resources'
import Expense from '../../../models/expense'
import ExpenseSerializer from '../../../serializers/expense_serializer'

const loggers = require('./loggers').default('expense')
const processors = require('./processors').default('expense', Expense)

export default resources({
  actions: {
    approve: {
      on: 'member',
      path: 'approve',
      method: 'patch'
    },
    reject: {
      on: 'member',
      path: 'reject',
      method: 'patch'
    }
  },
  defaultSort: '-date',
  filterParams: ['user_id','expense_type_id','project_id','date','is_approved'],
  logger: {
    approve: loggers.approve,
    reject: loggers.reject
  },
  model: Expense,
  name: 'expense',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  processor: {
    approve: processors.approve,
    reject: processors.reject
  },
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_expenses.project_id and expenses_members.user_id=? and expenses_members.is_owner=?', [req.user.get('id'), true])
    qb.whereNot('expenses_expenses.user_id', req.user.get('id'))
    qb.whereNull('is_approved')
  },
  rights: ['expenses.approve_expenses'],
  serializer: ExpenseSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor']
})
