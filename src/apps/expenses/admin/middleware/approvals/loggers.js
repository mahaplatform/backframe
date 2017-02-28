import log from 'platform/middleware/resources/helpers/log'

export default (type) => {

  const expenseLogger = (action) => {

    return (req, result) => {

      return result.load(['project']).then(() => {

        return log(req, `${action} {object1} in {object2}`, type, result.get('description'), 'project', result.related('project').get('title')).then(() => result)

      })

    }

  }

  return {
    approve: expenseLogger('approved'),
    reject: expenseLogger('rejected')
  }

}
