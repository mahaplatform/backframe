import resources from 'platform/middleware/resources'
import AppCategory from 'platform/models/app_category'
import AppCategorySerializer from 'platform/serializers/app_category_serializer'

export default resources({
  name: 'app_category',
  model: AppCategory,
  only: ['list'],
  ownedByTeam: false,
  path: 'apps/categories',
  serializer: AppCategorySerializer
})
