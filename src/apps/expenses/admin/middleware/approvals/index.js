import resources from 'platform/middleware/resources'
import Approval from '../../../models/approval'
import ApprovalSerializer from '../../../serializers/approval_serializer'
import { approveProcessor, rejectProcessor } from './processors'
import { approveLogger, rejectLogger } from './loggers'

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
    approve: approveLogger,
    reject: rejectLogger
  },
  model: Approval,
  name: 'approval',
  only: ['list','show','update'],
  ownedByUser: false,
  path: 'approvals',
  processor: {
    approve: approveProcessor,
    reject: rejectProcessor
  },
  // query: (qb, req, filters) => {
  //   qb.whereNot('expenses_expenses.user_id', req.user.get('id'))
  //   qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_expenses.project_id and expenses_members.user_id=? and expenses_members.is_owner=?', [req.user.get('id'), true])
  // },
  serializer: ApprovalSerializer,
  sortParams: ['date'],
  withRelated: ['owner.user.photo','owner.project']
})
