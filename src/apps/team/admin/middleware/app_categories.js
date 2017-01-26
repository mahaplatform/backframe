import resources from 'platform/middleware/resources'
import AppCategory from 'platform/models/app_category'
import AppCategorySerializer from 'platform/serializers/app_category_serializer'

export default router => {

  router.use('/apps/categories', resources({
    name: 'app_category',
    model: AppCategory,
    serializer: AppCategorySerializer,
    team: false
  }))

}
