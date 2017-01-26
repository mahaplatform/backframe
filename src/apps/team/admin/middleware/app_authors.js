import resources from 'platform/middleware/resources'
import AppAuthor from 'platform/models/app_author'
import AppAuthorSerializer from 'platform/serializers/app_author_serializer'

export default router => {

  router.use('/apps/authors', resources({
    name: 'app_author',
    model: AppAuthor,
    serializer: AppAuthorSerializer,
    team: false
  }))

}
