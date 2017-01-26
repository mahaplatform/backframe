import resources from 'platform/middleware/resources'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'

export default router => {

  router.use('/assets', resources({
    name: 'asset',
    model: Asset,
    serializer: AssetSerializer
  }))

}
