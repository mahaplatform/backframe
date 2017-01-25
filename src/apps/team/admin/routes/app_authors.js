import resources from 'server/middleware/resources'
import AppAuthor from 'platform/models/app_author'
import AppAuthorSerializer from 'platform/serializers/app_author_serializer'

export default router => {

  router.use(resources({
    name: 'app_author',
    path: 'apps/authors',
    model: AppAuthor,
    serializer: AppAuthorSerializer,
    team: false
  }))

}
