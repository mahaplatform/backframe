import resources from 'platform/middleware/resources'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'
import Member from '../../../models/member'

export default resources({
  allowedParams: ['title','code'],
  name: 'project',
  model: Project,
  resources: [
    {
      allowedParams: ['user_id'],
      defaultParams: (req) => {
        return Promise.resolve({
          project_id: req.params.project_id
        })
      },
      name: 'member',
      model: Member,
      query: (qb, req, filters) => {
        qb.where({ project_id: req.params.project_id })
      },
      withRelated: ['user.photo']
    }
  ],
  serializer: ProjectSerializer
})
