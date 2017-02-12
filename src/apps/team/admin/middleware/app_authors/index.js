import resources from 'platform/middleware/resources'
import AppAuthor from 'platform/models/app_author'
import AppAuthorSerializer from 'platform/serializers/app_author_serializer'

export default resources({
  name: 'app_author',
  model: AppAuthor,
  ownedByTeam: false,
  only: ['list'],
  path: 'apps/authors',
  serializer: AppAuthorSerializer
})
