import log from 'platform/middleware/resources/helpers/log'

export const createMemberLogger = (req, result) => {

  return result.load(['user','project']).then(() => {

    return log(req, 'added {object1} to {object2}', 'member', result.related('user').get('full_name'), 'project', result.related('project').get('title')).then(() => result)

  })

}

export const createExpenseTypeLogger = (req, result) => {

  return result.load(['expense_type','project']).then(() => {

    return log(req, 'added {object1} to {object2}', 'expense type', result.related('expense_type').get('title'), 'project', result.related('project').get('title')).then(() => result)

  })

}
