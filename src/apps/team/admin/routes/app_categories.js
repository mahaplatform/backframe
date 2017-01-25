import resources from 'server/middleware/resources'
import AppCategory from 'platform/models/app_category'
import AppCategorySerializer from 'platform/serializers/app_category_serializer'

export default router => {

  router.use(resources({
    name: 'app_category',
    path: 'apps/categories',
    model: AppCategory,
    serializer: AppCategorySerializer,
    team: false
  }))

}
