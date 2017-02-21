import log from 'platform/middleware/resources/helpers/log'

const expenseLogger = (action) => {

  return (req, result) => {

    return result.load(['project']).then(() => {

      return log(req, `${action} {object1} in {object2}`, 'expense', result.get('description'), 'project', result.related('project').get('title')).then(() => result)

    })

  }

}

export const approveLogger = expenseLogger('approved')

export const rejectLogger = expenseLogger('rejected')
