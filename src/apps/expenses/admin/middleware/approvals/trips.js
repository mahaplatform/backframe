import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import { approveProcessor, rejectProcessor } from '../approvals/processors'
import { approveLogger, rejectLogger } from '../approvals/loggers'

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
  filterParams: ['user_id','advance_type_id','project_id','date','is_approved'],
  logger: {
    approve: approveLogger,
    reject: rejectLogger
  },
  model: Advance,
  name: 'advance',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  processor: {
    approve: approveProcessor,
    reject: rejectProcessor
  },
  query: (qb, req, filters) => {
    qb.whereNot('expenses_advances.user_id', req.user.get('id'))
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_advances.project_id and expenses_members.user_id=? and expenses_members.is_owner=?', [req.user.get('id'), true])
    qb.whereNull('is_approved')
  },
  rights: ['expenses.approve_expenses'],
  serializer: AdvanceSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','advance_type','vendor']
})
