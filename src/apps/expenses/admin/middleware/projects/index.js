import resources from 'platform/middleware/resources'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'
import Member from '../../../models/member'
import MemberSerializer from '../../../serializers/member_serializer'
import ExpenseType from '../../../models/expense_type'

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
      allowedParams: ['user_id'],
      defaultParams,
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
      model: ExpenseType,
      query:(qb, req, filters) => {

        qb.innerJoin('expenses_expense_types_projects', 'expenses_expense_types.id', 'expenses_expense_types_projects.expense_type_id')

        qb.where('expenses_expense_types_projects.project_id', req.params.project_id)

      }
    }

  ],
  serializer: ProjectSerializer
})
