import Expense from '../../../models/expense'

export default (type, model) => {

  const expenseProcessor = (action, is_approved) => {

    return req => {

      return model.where({ id: req.params.id }).fetch().then(resource => {

        return resource.save({ is_approved }, { patch: true }).then(() => resource)

      }).catch(err => {

        if(err.errors) throw({ code: 422, message: `Unable to ${action} ${type}`, errors: err.toJSON() })

        throw(err)

      })

    }

  }

  return {
    approve: expenseProcessor('approve', true),
    reject: expenseProcessor('reject', false)
  }

}
