import resources from 'platform/middleware/resources'
import MemberType from '../../../models/member_type'

export default resources({
  defaultSort: 'id',
  model: MemberType,
  name: 'member_type',
  only: 'list',
  ownedByTeam: false,
  rights: ['expenses.manage_configuration']
})
