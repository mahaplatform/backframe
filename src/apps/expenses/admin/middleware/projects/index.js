import resources from 'platform/middleware/resources'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'
import Member from '../../../models/member'

export default resources({
  name: 'project',
  model: Project,
  resources: [
    {
      name: 'member',
      model: Member,
      withRelated: ['user.photo']
    }
  ],
  serializer: ProjectSerializer
})
