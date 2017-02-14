import resources from 'platform/middleware/resources'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'
import Member from '../../../models/member'
import MemberSerializer from '../../../serializers/member_serializer'
import ExpenseType from '../../../models/expense_type'
import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import User from 'platform/models/user'
import UserSerializer from 'platform/serializers/user_serializer'
import ExpenseTypeProject from '../../../models/expense_type_project'
import ExpenseTypeProjectSerializer from '../../../serializers/expense_type_project_serializer'
import { create } from './processors'

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
      defaultSort: 'last_name',
      model: User,
      name: 'user',
      only: 'list',
      path: 'members/unassigned',
      query: (qb, req, filters) => {
        qb.joinRaw('left join "expenses_members" on "expenses_members"."user_id"="users"."id" and "expenses_members"."project_id"=?', req.params.project_id)
        qb.whereNull('expenses_members.id')
      },
      serializer: UserSerializer,
      searchParams: ['first_name','last_name','email'],
      sortParams: ['last_name'],
      withRelated: ['photo']
    },{
      defaultSort: 'title',
      model: ExpenseType,
      name: 'expense_type_project',
      only: 'list',
      path: 'expense_types/unassigned',
      query: (qb, req, filters) => {
        qb.joinRaw('left join "expenses_expense_types_projects" on "expenses_expense_types_projects"."expense_type_id"="expenses_expense_types"."id" and "expenses_expense_types_projects"."project_id"=?', req.params.project_id)
        qb.whereNull('expenses_expense_types_projects.id')
      },
      serializer: ExpenseTypeSerializer,
      searchParams: ['title','code'],
      sortParams: ['title']
    },{
      allowedParams: ['user_id','is_owner'],
      defaultParams,
      defaultSort: ['-is_owner', 'last_name'],
      name: 'member',
      model: Member,
      processor: {
        create
      },
      query: (qb, req, filters) => {
        qb.innerJoin('users','users.id','expenses_members.user_id')
        qb.where({ project_id: req.params.project_id })
      },
      serializer: {
        all: MemberSerializer
      },
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
