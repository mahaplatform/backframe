import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'

const loggers = require('./loggers').default('advance')
const processors = require('./processors').default('advance', Advance)

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
  defaultSort: '-date_needed',
  filterParams: ['user_id','expense_type_id','project_id','date_needed','is_approved'],
  logger: {
    approve: loggers.approve,
    reject: loggers.reject
  },
  model: Advance,
  name: 'advance',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  processor: {
    approve: processors.approve,
    reject: processors.reject
  },
  query: (qb, req, filters) => {
    qb.whereNot('expenses_advances.user_id', req.user.get('id'))
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_advances.project_id and expenses_members.user_id=? and expenses_members.member_type_id=?', [req.user.get('id'), 1])
    qb.whereNull('is_approved')
  },
  rights: ['expenses.approve_expenses'],
  serializer: AdvanceSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor']
})
