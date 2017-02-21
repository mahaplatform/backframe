import log from 'platform/middleware/resources/helpers/log'

export const createExpenseLogger = (req, result) => {

  return result.load(['project']).then(() => {

    return log(req, 'created {object1} in {object2}', 'expense', result.get('description'), 'project', result.related('project').get('title')).then(() => result)

  })

}
