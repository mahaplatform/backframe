import resources from 'platform/middleware/resources'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'
import Member from '../../../models/member'
import MemberSerializer from '../../../serializers/member_serializer'
import ExpenseTypeProject from '../../../models/expense_type_project'
import ExpenseTypeProjectSerializer from '../../../serializers/expense_type_project_serializer'

const defaultParams = (req) => {
  return Promise.resolve({
    project_id: req.params.project_id
  })
}

export default resources({
  allowedParams: ['title','code'],
  name: 'project',
  model: Project,
  resources: [
    {
      allowedParams: ['user_id','is_owner'],
      defaultParams,
      defaultSort: ['is_owner', 'last_name'],
      name: 'member',
      model: Member,
      query: (qb, req, filters) => {
        qb.where({ project_id: req.params.project_id })
      },
      serializer: MemberSerializer,
      withRelated: ['user.photo']
    },{
      allowedParams: ['expense_type_id'],
      defaultParams,
      name: 'expense_type',
      model: ExpenseTypeProject,
      ownedByTeam: false,
      query: (qb, req, filters) => {
        qb.where({ project_id: req.params.project_id })
      },
      serializer: ExpenseTypeProjectSerializer,
      withRelated: ['expense_type','project']
    }
  ],
  serializer: ProjectSerializer
})
