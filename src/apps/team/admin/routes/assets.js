import resources from 'server/middleware/resources'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'

export default router => {

  router.use(resources({
    name: 'asset',
    path: 'assets',
    model: Asset,
    serializer: AssetSerializer
  }))

}
