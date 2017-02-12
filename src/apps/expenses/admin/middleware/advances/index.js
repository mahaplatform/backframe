import resources from 'platform/middleware/resources'
import Advance from '../../../models/advance'

export default resources({
  name: 'advance',
  model: Advance,
  ownedByUser: true,
  path: 'advances',
  withRelated: ['user','project','expense_type']
})
