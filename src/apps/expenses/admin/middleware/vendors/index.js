import resources from 'platform/middleware/resources'
import Vendor from '../../../models/vendor'
import VendorQuery from '../../../queries/vendor_query'

export default resources({
  allowedParams: ['name'],
  name: 'vendor',
  model: Vendor,
  path: 'vendors',
  query: VendorQuery
})
